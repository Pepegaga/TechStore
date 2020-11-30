const graphql = require('graphql')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLID} = graphql

const Users = require('../models/User')
const Goods = require('../models/Good')


const GoodType = new GraphQLObjectType({
    name: 'Good',
    fields: ()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        brand: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent,args){
                return Users.findById(args.id)
            }
        }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ()=>({
        id: {type: GraphQLID},
        login: {type: GraphQLString},
        password: {type: GraphQLString},
        token: {type: GraphQLString},
        good: {
            type: GoodType,
            resolve(parent, args){
                return Goods.find({id: parent.id})
            }
        }
    })
})

const Query  = new GraphQLObjectType({
    name: 'Query',
    fields: {
        good: {
            type: GoodType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return movies.find(movie => movie.id == args.id)
                return Goods.findById(args.id)
            }
        },
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return directors.find(director => director.id == args.id)
                return Users.findById(args.id)
            }
        },
        users: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return directors.find(director => director.id == args.id)
                return Users.find({})
            }
        },
        goods: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return directors.find(director => director.id == args.id)
                return Goods.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: Query
})