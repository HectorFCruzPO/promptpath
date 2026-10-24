export function validateContribution(input:any, promptIds:string[]) {
 if(!input || !['new','edit'].includes(input.kind)) return 'Choose a contribution type.';
 if(input.kind==='edit' && !promptIds.includes(input.promptId)) return 'Choose an existing prompt.';
 for(const [key,min,max] of [['title',3,160],['category',1,1],['content',30,30000],['reason',15,3000]] as const){
  if(typeof input[key]!=='string'||input[key].trim().length<min||input[key].length>max) return `Check ${key}: use ${min}–${max} characters.`;
 }
 if(!'ABCDEFG'.includes(input.category)) return 'Choose a valid category.';
 return null;
}
