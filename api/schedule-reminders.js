const {configuration,configured,authorized,loadPrograms,buildPlan,reconcile}=require('../lib/push-reminders');
let running=false,lastStarted=0;
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','no-store');
 if(!['GET','POST'].includes(req.method)){res.setHeader('Allow','GET, POST');return res.status(405).json({error:'Method not allowed'})}
 if(req.headers.origin&&req.headers.origin!=='https://gastromasa.vercel.app')return res.status(403).json({error:'Forbidden'});
 const config=configuration();if(!authorized(req.headers.authorization,config.secret))return res.status(401).json({error:'Unauthorized'});
 if(!configured(config))return res.status(503).json({error:'Push service is not configured'});
 if(running||Date.now()-lastStarted<60000){res.setHeader('Retry-After','60');return res.status(429).json({error:'Please retry later'})}
 running=true;lastStarted=Date.now();
 try{const {programs,locales}=loadPrograms();const plan=buildPlan(programs,locales,config);const result=await reconcile(plan,config);return res.status(result.failed.length?502:200).json(result)}catch{return res.status(502).json({error:'Could not schedule reminders. Check the push service configuration.'})}finally{running=false}
};
