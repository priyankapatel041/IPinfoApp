const Redis= require('ioredis')



let configuration={
    port:19965,
    host :"redis-19965.c305.ap-south-1-1.ec2.cloud.redislabs.com",
    username:"default",
    password:"V8IxtYw6DbXXMaHW5S5L3ORMcAdnCRKS"

}



const client = new Redis(configuration)


module.exports= {client}