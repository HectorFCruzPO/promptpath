import { getDb } from '../../../db';
import { contributions } from '../../../db/schema';
import { getChatGPTUser } from '../../chatgpt-auth';
import { desc, and, eq, gte, count } from 'drizzle-orm';
import data from '../../../lib/content.json';
import { validateContribution } from '../../../lib/contribution-validation';
export const dynamic='force-dynamic';
const response=(body:any,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){
 try{
  const rows=await getDb().select({id:contributions.id,kind:contributions.kind,promptId:contributions.promptId,title:contributions.title,category:contributions.category,content:contributions.content,reason:contributions.reason,createdAt:contributions.createdAt,status:contributions.status}).from(contributions).orderBy(desc(contributions.createdAt)).limit(100);
  return response({contributions:rows});
 }catch{return response({error:'The proposal queue is temporarily unavailable. Your input has not been changed.'},503);}
}
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin) return response({error:'Please submit from this site.'},403);
 const user=await getChatGPTUser();
 if(!user) return response({error:'Sign in with ChatGPT to submit your proposal.',signIn:true},401);
 if(Number(request.headers.get('content-length')||0)>60000) return response({error:'The proposal is too long.'},413);
 let value:any;
 try{const text=await request.text();if(text.length>60000)return response({error:'The proposal is too long.'},413);value=JSON.parse(text);}catch{return response({error:'Could not read your proposal.'},400);}
 const invalid=validateContribution(value,data.prompts.map(p=>p.id));if(invalid)return response({error:invalid},400);
 try{
  const db=getDb();const recent=await db.select({n:count()}).from(contributions).where(and(eq(contributions.authorId,user.userId),gte(contributions.createdAt,Date.now()-600000)));
  if(recent[0].n>=5)return response({error:'You have submitted five proposals recently. Please try again in ten minutes.'},429);
  const id=crypto.randomUUID();await db.insert(contributions).values({id,kind:value.kind,promptId:value.kind==='edit'?value.promptId:null,title:value.title.trim(),category:value.category,content:value.content.trim(),reason:value.reason.trim(),authorId:user.userId,createdAt:Date.now(),status:'pending'});
  return response({id,status:'pending'},201);
 }catch{return response({error:'We could not save the proposal. Your draft is still in the form; please try again.'},503);}
}
