
import type { D1Database } from "@cloudflare/workers-types";

type Env = { DB: D1Database };

const respond=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export const onRequestPost=async({request,env}:{request:Request;env:Env})=>{
  let visitorId='';
  try{const payload=await request.json() as {visitorId?:unknown};visitorId=typeof payload.visitorId==='string'?payload.visitorId:'';}catch{return respond({error:'Solicitud inválida.'},400);}
  if(!/^[a-f0-9-]{36}$/i.test(visitorId))return respond({error:'Identificador inválido.'},400);
  if(!env.DB)return respond({error:'Contador no configurado.'},503);
  try{
    await env.DB.prepare('INSERT OR IGNORE INTO visitors (visitor_id) VALUES (?)').bind(visitorId).run();
    const row=await env.DB.prepare('SELECT COUNT(*) AS total FROM visitors').first<{total:number}>();
    return respond({visitors:row?.total??0});
  }catch{return respond({error:'Contador no disponible.'},503);}
};
