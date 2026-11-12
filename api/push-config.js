const {configuration,configured}=require('../lib/push-reminders');
module.exports=async(req,res)=>{res.setHeader('Cache-Control','public, max-age=0, s-maxage=300');if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});const config=configuration();return res.status(200).json(configured(config)?{configured:true,appId:config.appId}:{configured:false})};
