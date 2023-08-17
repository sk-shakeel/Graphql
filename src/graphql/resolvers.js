const {weatherData} =require('./data')

exports.resolvers={
    Query: {
        weather:(parent,args,context)=>{
            return weatherData
        }
    }
}
