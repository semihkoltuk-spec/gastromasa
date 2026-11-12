const {configuration,configured,authorized,loadPrograms,buildPlan,reconcile}=require('../lib/push-reminders');
module.exports=async(req,res)=>{
 res.setHeader('Cache-Control','no-store');
 if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'Method not allowed'});
 const config=configuration();if(!authorized(req.headers.authorization,config.secret))return res.status(401).json({error:'Unauthorized'});
 if(!configured(config))return res.status(503).json({error:'Push service is not configured'});
 try{const {programs,locales}=loadPrograms();const plan=buildPlan(programs,locales,config);const result=await reconcile(plan,config);return res.status(result.failed.length?502:200).json(result)}catch{return res.status(502).json({error:'Could not schedule reminders. Check the push service configuration.'})}
};
