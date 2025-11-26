export default ()=>({
    port:process.env.PORT,
    db:{
        url:process.env.DB_URL,
        
    },
    tokenAccess:{},
    cloud:{
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET,
        cloud_name:process.env.CLOUD_NAME

    },
    access:{
        jwt_secret : process.env.jwt_secret}
}) 