# node-api-starter-with-hapijs-cosmosdb
Node project starter template with hapi.js, azure-cosmos-db, typescript, eslint and hot-reload package.

## Packages Used
* Hapi.js: web framework
* Azure Cosmos DB
* Typescript
* Eslist: to check code standard.
* nodemon: to hot reload code changes at development time.

## Eslint configuration steps
* **How would you like to use Eslint?**  
  *To check syntax, find problems, and enforce code style.*  
* **Typpes of modules your project use?**  
  *CommonJs*  
* **JS framework?** (React? vue?)  
  *None*  
* **Typescript?**  
  *No*  
* **Where does your code run?**  
  *Node*  
* **Define styles for you project:**  
  *Answer questions about you style*  
* **What format do you want your config file to be in?**  
  *Json*  
* **What style of indentation do you use?**  
  *Space*  
* **What quotes do you use for strings?**  
  *single*  
* **What line endings do you use?**  
  *windows*  
* **Would you like to install them now?**  
  *Yes*  
* **Which package manager do you want to use?**  
  *npm*

Note about getting rid of semicolon (;): Javascript has this ability. Without an extra syntax, code will be cleaner (think about the cleanness of Python code). Only use it, where it is necessary; unless we can start to omit it from now.


## Azure Cosmos DB Concepts
* Hierarchy: db-account > db > container1, container2, ... containerN
* Containers are the name of collection of documents, like tables.
* When there's more than one container, a partiion key must be assigned. Which will then use to distribute data across multiple partiions (servers?). A Partition key is a property name of that container/document, like id, country, city etc. Partition key can be nested, like "/country/city".
* A container must be assigned minimum of 400 RU/s.


## Notes
### To run a npm package command directly from command. For example
  ```
  node_modules\\.bin\\eslint .
  ```
  But when added in `npm script`, full path is not needed.  
  N.b. if full path command is not working, check your command line application, try using simple command line/shell application.



## Frequently shooted troubles (troubleshooting)
### Trouble: eslint error *Require statement not part of import statement.*
On code `require('something')`.

**Shoot**: add rules to your .eslintrc.json (or whatever file type you are using).

```json
"rules": {
 "@typescript-eslint/no-var-requires": "off"
}
```

### Trouble: Eslist error: *Failed to load plugin '@typescript-eslint' declared in '.eslintrc.json': Cannot find module 'typescript'*
**Shoot**: Install typescript globally or as a dev-dependency. Not sure why *typescript* was not included as a dependency in  *typescript-eslint*!
