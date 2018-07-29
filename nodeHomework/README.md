You can use this site as an online IDE and tempory server to run apps
https://c9.io/clockworkrobot

Connect to web APIs so you can build widgets
https://ifttt.com

More web API resources
https://www.programmableweb.com/

RESTful routes:
Name        Route               HTTP Verb       Purpose
=======================================================
index       /things             GET             List all `things`
new         /things/new         GET             Show new `thing` form
create      /things             POST            Create new `thing`, then redirect somewhere (typically back to `index`)
show        /things/:id         GET             Show info about a specific `thing`
edit        /things/:id/edit    GET             Show edit form for one `thing`
update      /things/:id         PUT             Update a particular `thing`, then redirect somewhere (typically back to `index`)
destroy     /things/:id         DELETE          Delete a particular `thing`, then redirect somewhere (typically back to `index`)

MongoDB Notes:
    run `mongod` to start the Mongo server locally
        requires `/data/db` and `/data/log`, or you can use `-dbpath <fullPath>` to point it somewhere else

Commands:
    `use`: 
        select the DB to be active
        DB is created if it doesn't exist
    `show`: 
        lists various things
        Options: `dbs`, `collections`, ...
    `insert`: 
        push something into the DB
        syntax: db.<collectionName>.insert({key: "value"})
    `find`:
        find entries in the current DB
        syntax: db.<collectionName>.find({<optional>})
        leave empty to return everything in the collection
        pass in an object with fields filled out that you want to match
    `update`:
        db.<collectionName>.update({<objectPropertiesToMatch>}, {<newValuesToSet>})
        use {$set: {<specificProperties>}} to only change the specific properties
        otherwise properties not present in {<newValuesToSet>} will be removed
    `remove`:
        db.<collectionName>.remove({<objectPropertiesToMatch>})
        can add `, {justOne: true}` after the search object to limit how many are removed
    `drop`:
        db.<collectionName>.drop()
        delete all entries in the given collection