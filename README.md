Blockchain Network for storing student ledgers across university nodes using Hyperledger Composer and Hyperledger Fabric.

Technical Stack used :-

1. Hyperledger Composer
2. Hyperledger Fabric
3. Hyperledger Composer Rest API
4. PassportJS Google OAuth
5. Docker Engine
6. NodeJS and JSON
7. AngularJS UI

![alt text](https://raw.githubusercontent.com/username/projectname/branch/path/to/img.png)

Before beginning, you need to ensure the system requirements are equipped with the required configurations. You need to download certain prerequisites and set up a basic development environment. Follow the links below to do those :

https://hyperledger.github.io/composer/installing/installing-prereqs.html

https://hyperledger.github.io/composer/installing/development-tools.html

After these prerequisites are met, ensure that Docker is running and then run the script file ./startFabric.sh and wait for sometime until the project gets initialised.

Step - 1 :- Outlining of Business Network

Our Business Network Definition (BND) consists of the data model, transaction logic, and access control rules. The data model and access control rules are coded in domain specific language. The transaction logic will be coded in JavaScript.
To create the BND, we created a skeleton business network using Yeoman by running the command :

$ yo hyperledger-composer

A series of questions are fired and you need to answer appropriately according to your BND.

Step - 2 :- Defining Transaction Logic

First, we’ll define models/test.cto path in the project. It contains the class definitions for all assets, participants, and transactions in the business network. This file is written in Hyperledger Composer Modelling Language.

Here, Student is an asset which is uniquely identified with univRoll. 
Client is a participant which is uniquely identified with clientId. Each Customer has it's respective clientName.
AddStudent is a transaction that can occur from Client to Student and vice-versa.

Now, we'll define lib/logic.js path in the project by adding transaction logic in JavaScript

@param {edu.university.rajasthan.AddStudent} addStudentTransaction is the decorator we put at the top of the file to link the transaction with our JavaScript function.

Step - 3 :- Generate the Business Network Archive (BNA)

Now that the business network has been defined, it must be packaged into a deployable business network archive (.bna) file:

$ composer archive create -t dir -n .

Now Install the Composer Runtime:

$ composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName rajasthan-university-network

Now Deploy the business network:

$ composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile rajasthan-university-network@0.0.1.bna --file networkadmin.card

Now Import the network administrator identity as a usable business network card:

$ composer card import --file networkadmin.card

To check that the business network has been deployed successfully, run the following command to ping the network:

$ composer network ping --card admin@rajasthan-university-network

Finally, to create a RESTful API from your command line, run the following command:

$ composer-rest-server

This will further shoot a lot of questions which needs to be answered according to the project consensus.

Now point your browser to http://localhost:3000/explorer.
You’ll see your customised blockchain API.