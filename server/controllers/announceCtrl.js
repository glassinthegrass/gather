module.exports={   
    getGroupAnnouncements: async (req,res)=>{
        const db = req.app.get("db");

},
    getRecentAnnouncements:async(req,res)=>{
        const db = req.app.get("db");
},
    createAnnouncement: async (req,res)=>{
        const db = req.app.get("db");
},
    deleteAnnouncement:async (req,res)=>{
        const db = req.app.get("db");
},
    createPlatformAnnouncement:async(req,res)=>{
        const db = req.app.get("db");
}
}
