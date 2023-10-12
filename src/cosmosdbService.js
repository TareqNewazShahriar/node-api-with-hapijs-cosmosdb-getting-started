/// This service communicates with Cosmos DB and does all data manupulation work.

// @ts-check
import { CosmosClient } from '@azure/cosmos'
import appConfig from './appConfig.json' assert {type: 'json'} // if broken on future version, see the change log.

// For simplicity we'll set a constant partition key
const partitionKey = undefined

const ContainerNames = {
   // labels: 'labels',
   // points: 'points',
   // comments: 'comments'
   items: 'Items'
}

class CosmosdbService {

   containers = {}

   init() {
      const cosmosClient = new CosmosClient({
         endpoint: appConfig.COSMOS_DB.ENDPOINT,
         key: appConfig.COSMOS_DB.AUTH_KEY
      })
      const databaseId = appConfig.COSMOS_DB.DATABASE_ID

      return new Promise((resolve, reject) => {
         cosmosClient.databases.createIfNotExists({ id: databaseId })
            .then(response => {
               const cosmosDb = response.database
               this.containers = {}
               const promises = []

               for (const name of Object.values(ContainerNames)) {
                  const promise = cosmosDb.containers.createIfNotExists({ id: name })
                     .then(response => {
                        this.containers[name] = response.container
                     })
                     .catch(error => error)
                  promises.push(promise)
               }
               Promise.all(promises)
                  .then(() => resolve(null))
            })
            .catch(error => reject(error))
      })
   }

   get(containerName, id) {
      return new Promise((resolve, reject) => {
         this.containers[containerName].item(id, partitionKey)
            .read()
            .then(r => {
               resolve(r.resource)
            })
            .catch(error => {
               reject(error)
            })

      })
   }

   /**
    * Performs SQL query on a container.
    * @param {string} containerName
    * @param {array|object} parameters: in the format [{ name: '@name_of_column', value: x }]. If only on parameter, then just pass the object without array.
    */
   query(containerName, parameters) {
      const querySpec = {
         query: `SELECT * FROM ${containerName}`,
         parameters: parameters instanceof Array ? parameters : [parameters]
      }

      return new Promise((resolve, reject) => {
         this.containers[containerName].items.query(querySpec)
            .fetchAll()
            .then(response => {
               resolve(response.resources)
            })
            .catch(error => {
               reject(error)
            })
      })
   }

   create(containerName, item) {
      return new Promise((resolve, reject) => {
         this.containers[containerName].items.create(item /*, { preTriggerInclude: ['addToDoItemTimestamp'] }*/)
            .then(r => {
               resolve(r.resource)
            })
            .catch(err => {
               reject(err)
            })
      })
   }

   update(containerName, id, item) {
      return new Promise((resolve, reject) => {
         this.containers[containerName]
            .item(id, partitionKey)
            .replace(item)
            .then(r => {
               resolve(r.resource)
            })
            .catch(err => {
               reject(err)
            })
      })
   }
}

export { CosmosdbService, ContainerNames }