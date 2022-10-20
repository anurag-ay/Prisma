//// Lec 00:00 - Introduction

// you will require node in the system
// and must have some relational database like mysql or postgreSQL on the cloud

// Pirsma generally built for relational database
////===============================================================================================================================
//// Lec 01:12 - Project Setup

// install Prisma and other development dependencies

//// Lec npm i -D prisma typescript ts-node @types/node nodemon
// tsnode-> typeScript definition for node

// tsc --init -> to enable the ts config file.

////===============================================================================================================================
//// Lec 02:35 - Prisma Setup

// initialize prisma
// npx prisma init -> it will intialize the prisma configuration, migration, and schema for us.

// we can also tell the type of database we are using by typing the
// npx prisma init --datasource-provider postgresql

//.env -> it contains the URL of the database

// schema.prisma

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client -> it contains the inforamtion of the engine that will generate our code

// datasource db -> it contains the type of database we are using and the url of that database

////===============================================================================================================================
//// Lec 06:38 - Basic Prisma Model Setup

// // Defining the basic shcema

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// // defing the model (User)

// model User{
//   id Int @id @default(autoincrement())
//   name String
// }

////===============================================================================================================================
//// Lec 07:56 - Prisma Migration Basics

// How to notify the database that save the applied changes that we have done in the
// schema.prisma

// Note: Install postgreSQL and change your connection string

// npx prisma migrate dev --name init

//npx prisma migate -> migrate the changes to the database
// dev -> these changes is only of development
// --name init -> giving the name of init -> because we are initializing our database with this
// new model of user.

////===============================================================================================================================
//// Lec 09:11 - Prisma Client Basics

// client is all about accessing the data form the database
// and preform the crud operations on the database.

// how to install client libraries
// npm i @prisma/client

// manually regnerate the client
// npx prisma gernerate

// copy the gerated code and paste it into the
//.. new file called script.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // injecting the users to the postgreSQL database.
  const user = await prisma.user.create({ data: { name: "Sally" } });
  const users = await prisma.user.findMany();
  console.log(user);
  console.log(users);
}

main().catch((e) => {
  console.log(e.message);
});

////===============================================================================================================================
//// Lec 14:10 - Datasources and Generators

// datasorce db -> this must contain the provider and the url for that provider
// generator-> here you can have more than one type of generator like geneartor of
//... relational database and the generator for like graphQL databases etc.

////===============================================================================================================================
//// Lec 15:12 - Model Fields

// Models-> Model represents the  different tables inside your databse
//.. where you can store .

// each model composed of  different field  consist of different field
// field consist the different data
// ex-> id, name, email etc.
// and each data have thier types and modifier, and attributes and constraits.

// different field types

// Int
// String
// Boolean
// BigInt-> very large number
// Float -> example rating {8.8}
// Decimal -> more specific than float
// DateTime -> time stamps

// Json ->to store json object Not supported by all by postgreSQL supports it
// Byte -> to stre raw byte file
// Unsupported("") -> prisma allowes it the take the database which is already exist and covert it to the
// schema file, in doing so you will be encountered with some datatypes which are not supported by the prisma

// User -> data that reperesent another data.

////===============================================================================================================================
//// Lec 19:19 - Model Relationships

// How to create the relationships among the data in the database.

// User -> data that reperesent another data.

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// // defining the model (User)

// model User{
//   id Int @id @default(autoincrement())
//   name String
//   email String
//   isAdmin Boolean
//   preference Json
//   Post Post[]
// }

// model Post{
//   id Int @id @default(autoincrement())
//   rating Float
//   createAt DateTime
//   updateAt DateTime
//   author User @relation(fields: [userId], references: [id])
//   userId Int
// }

// Types of relationships
// 1. one to many
// 2. many to many
// 3. one to one

// 1. one to many relationship -> user is going to have many posts
// field type modifier-> ? (optional) [] (many)

//@relation(fields: [userId], references: [id]) -> it means what field of our
// Post is referencing to the id -> of the User table
// authorId in the post table will be the foreign key referncing to the User id of user table.

// we can use more that just auto incrementing id's we can use uuid()

// model User{
//   id String @id @default(uuid())
//   name String
//   email String
//   isAdmin Boolean
//   preference Json
//   Post Post[]
// }

// model Post{
//   id Int @id @default(autoincrement())
//   rating Float
//   createAt DateTime
//   updateAt DateTime
//   author User @relation(fields: [userId], references: [id])
//   userId String
// }

// Note -> uuids are more secure that the autoicrement because they are
//.. unique strings and are random,really hard to guess

// How to create two references for one table
// ex-> user can have two types of posts ex-> written posts and favourite posts.

// Problem -> to prisma will know which reference will be for which type of posts
// to uniquely identify the reference we have to give the table unique lables

// model User{
//   id String @id @default(uuid())
//   name String
//   email String
//   isAdmin Boolean
//   preference Json
//   writtenPosts Post[] @relation("writtenPosts")
//   favouritePosts Post[] @relation("favouritePosts")
// }

// model Post{
//   id String @id @default(uuid())
//   rating Float
//   createAt DateTime
//   updateAt DateTime
//   author User @relation("writtenPosts",fields: [authorId], references: [id])
//   authorId String
//   favouriteBy User? @relation("favouritePosts",fields: [favouriteById], references: [id])
//   favouriteById String?
// }

// 2. Many to Many relationships
// model User{
//   id String @id @default(uuid())
//   name String
//   email String
//   isAdmin Boolean
//   preference Json
//   writtenPosts Post[] @relation("writtenPosts")
//   favouritePosts Post[] @relation("favouritePosts")
// }

// model Post{
//   id String @id @default(uuid())
//   rating Float
//   createAt DateTime
//   updateAt DateTime
//   author User @relation("writtenPosts",fields: [authorId], references: [id])
//   authorId String
//   favouriteBy User? @relation("favouritePosts",fields: [favouriteById], references: [id])
//   favouriteById String?
//   categories Category[]
// }

// // many to many relationships

// model Category{
//   id String @id @default(uuid())
//   posts Post[]
//   // now it will automatically know the categories will reference to the
//   // Category and post will refernce to the Posts model
//   // Now it will automatically create the join table between the two that is going
//   // to hook up all the relationships for us
// }

// 3. One to One relationships
// model User{
//   id String @id @default(uuid())
//   name String
//   email String
//   isAdmin Boolean
//   preference Json
//   writtenPosts Post[] @relation("writtenPosts")
//   favouritePosts Post[] @relation("favouritePosts")
//   userPreference UserPreference?
// }

// // one to one reltaion ships
// model UserPreference{
//   id String @id @default(uuid())
//   emailUpdates Boolean
//   user User @relation(fields: [userId], references: [id])
//   userId String @unique
// }

// model Post{
//   id String @id @default(uuid())
//   rating Float
//   createAt DateTime
//   updateAt DateTime
//   author User @relation("writtenPosts",fields: [authorId], references: [id])
//   authorId String
//   favouriteBy User? @relation("favouritePosts",fields: [favouriteById], references: [id])
//   favouriteById String?
//   categories Category[]
// }

// // many to many relationships

// model Category{
//   id String @id @default(uuid())
//   posts Post[]
//   // now it will automatically know the categories will reference to the
//   // Category and post will refernce to the Posts model
//   // Now it will automatically create the join table between the two that is going
//   // to hook up all the relationships for us
// }

////===============================================================================================================================
//// Lec 26:16 - Model Attributes

// lets talk about attributes beside the other attributes like relation,id and default

// @relation
// @default-> sepecify the default if doest give by the user
// @id
// @unique
// @updateAt -> it will set the current time stamp if we have update this field

// Field level attribute vs Block level attribute
// Field level -> they are applied only the the filed and represented by using @
// Block level -> these attributes are applied to whole block and represented by using @@

// Block level attributes

// // defining block level attribute
//   @@unique([age,name]) // it means no two person can have same age and
//   // same name.
//   @@index([email]) // on which field you want indexing this will icrearea the prefomance
//   // of searching,sorting
//   @@id([title, authorId]) //definng the composite id

// model User{
//   id String @id @default(uuid())
//   age Int
//   name String
//   email String
//   isAdmin Boolean
//   preference Json

//   writtenPosts Post[] @relation("writtenPosts")
//   favouritePosts Post[] @relation("favouritePosts")
//   userPreference UserPreference?

//   // defining block level attribute
//   @@unique([age,name]) // it means no two person can have same age and
//   // same name.
//   @@index([email]) // on which field you want indexing this will icrearea the prefomance
//   // of searching,sorting
// }

// model UserPreference{
//   id String @id @default(uuid())
//   emailUpdates Boolean
//   user User @relation(fields: [userId], references: [id])
//   userId String @unique
// }

// model Post{
//   id String @id @default(uuid())
//   title String
//   age Int
//   averageRating Float
//   createAt DateTime @default(now())
//   updateAt DateTime @updatedAt
//   author User @relation("writtenPosts",fields: [authorId], references: [id])
//   authorId String
//   favouriteBy User? @relation("favouritePosts",fields: [favouriteById], references: [id])
//   favouriteById String?
//   categories Category[]

// }

// model Category{
//   id String @id @default(uuid())
//   name String @unique
//   posts Post[]
//}

////===============================================================================================================================
//// Lec 29:55 - Enums

// another type of data stores model are enums

// these are user defined models

// enum Role{
//   BASIC
//   ADMIN
//   EDITOR
// }

// model User{
//   id String @id @default(uuid())
//   age Int
//   name String
//   email String
//   role Role @default(BASIC)
//   isAdmin Boolean
//   preference Json

//   writtenPosts Post[] @relation("writtenPosts")
//   favouritePosts Post[] @relation("favouritePosts")
//   userPreference UserPreference?

//   // defining block level attribute
//   @@unique([age,name]) // it means no two person can have same age and
//   // same name.
//   @@index([email]) // on which field you want indexing this will icrearea the prefomance
//   // of searching,sorting
// }

// model UserPreference{
//   id String @id @default(uuid())
//   emailUpdates Boolean
//   user User @relation(fields: [userId], references: [id])
//   userId String @unique
// }

// model Post{
//   id String @id @default(uuid())
//   title String
//   age Int
//   averageRating Float
//   createAt DateTime @default(now())
//   updateAt DateTime @updatedAt
//   author User @relation("writtenPosts",fields: [authorId], references: [id])
//   authorId String
//   favouriteBy User? @relation("favouritePosts",fields: [favouriteById], references: [id])
//   favouriteById String?
//   categories Category[]

// }

// model Category{
//   id String @id @default(uuid())
//   name String @unique
//   posts Post[]

// }

// enum Role{
//   BASIC
//   ADMIN
//   EDITOR
// }

// Now lets migrate all the changes
// npx prisma migrate dev
// enter the name
// migration file will be created
////===============================================================================================================================
//// Lec 32:40 - Client Create Operations

// form now we will learn about the Pirsma client
// where we learn about the
// CREATING
// ADDING
// DELETING
// UPDATING

//CRUD -> operations

// when we create the pisma client it will manage the connections for us
// const prisma  = new PrismaClient()

// So make sure you only create only one instance of this pirsma client
// otherwise it will create so many connections

// to regenerate the code
// npx prisma generate

// Note if the code is not generate go to the typescript file by clicking the ctrl+mousekey
// ctrl + space -> to check what you can enter in the given field

// Creating the user.

async function main() {
  // injecting the data into database.
  const user = await prisma.user.create({
    data: {
      name: "kyle",
      email: "kyle@test.com",
      age: 27,
    },
  });
  console.log(user);
}

// delete all the users from the databse
await prisma.user.deleteMany();

// create nested users
async function main() {
  // injecting the data into database.
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "kyle",
      email: "kyle@test.com",
      age: 27,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
  });
  console.log(user);
}

// modifying our shcema

// // This is your Prisma schema file,
// // learn more about it in the docs: https://pris.ly/d/prisma-schema

// generator client {
//   provider = "prisma-client-js"
// }

// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
// }

// model User{
//   id String @id @default(uuid())
//   age Int
//   name String
//   email String
//   role Role @default(BASIC)
//   writtenPosts Post[] @relation("writtenPosts")
//   favouritePosts Post[] @relation("favouritePosts")
//   userPreference UserPreference? @relation(fields: [userPreferenceId], references: [id])
//   userPreferenceId String? @unique

//   // defining block level attribute
//   @@unique([age,name]) // it means no two person can have same age and
//   // same name.
//   @@index([email]) // on which field you want indexing this will icrearea the prefomance
//   // of searching,sorting
// }

// model UserPreference{
//   id String @id @default(uuid())
//   emailUpdates Boolean
//   user User?

// }

// model Post{
//   id String @id @default(uuid())
//   title String
//   age Int
//   averageRating Float
//   createAt DateTime @default(now())
//   updateAt DateTime @updatedAt
//   author User @relation("writtenPosts",fields: [authorId], references: [id])
//   authorId String
//   favouriteBy User? @relation("favouritePosts",fields: [favouriteById], references: [id])
//   favouriteById String?
//   categories Category[]

// }

// model Category{
//   id String @id @default(uuid())
//   name String @unique
//   posts Post[]

// }

// enum Role{
//   BASIC
//   ADMIN
//   EDITOR
// }

// note we did'nt get the email preferences returned
// if we want to we can do it using include
async function main() {
  // injecting the data into database.
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "kyle",
      email: "kyle@test.com",
      age: 27,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    include: {
      userPreference: true,
    },
  });
  console.log(user);
}

// we can only show the desired things using select
async function main() {
  // injecting the data into database.
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
    data: {
      name: "kyle",
      email: "kyle@test.com",
      age: 27,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    select: {
      name: true,
      userPreference: { select: { id: true } },
    },
  });
  console.log(user);
}

// How to show all the queires that we are running

// const prisma = new PrismaClient({ log: ["query"] });

// how to inject multiple data at once
async function main() {
  // injecting the data into database.
  await prisma.user.deleteMany();
  const users = await prisma.user.createMany({
    data: [
      {
        name: "kyle",
        email: "kyle@test.com",
        age: 27,
      },
      {
        name: "Sally",
        email: "sally@test.com",
        age: 32,
      },
    ],
  });
  console.log(users);
}
////===============================================================================================================================
//// Lec 40:15 - Client Read Operations

// How to read or find the data form the database ?

// find using unique porperties like email, id etc
async function main() {
  const user = await prisma.user.findUnique({
    where: {
      age_name: {
        age: 27,
        name: "kyle",
      },
    },
  });
  console.log(user);
}
//or
async function main() {
  const user = await prisma.user.findUnique({
    where: {
      age_name: {
        age: 27,
        name: "kyle",
      },
    },
    select: {
      name: true,
    },
  });
  console.log(user);
}

// Find the very first thing that matches the query
// findFirst()

async function main() {
  const user = await prisma.user.findFirst({
    where: {
      name: "Sally",
    },
  });
  console.log(user);
}

// how to find all the users that matches the following Query
// findMany()
async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: "Sally",
    },
  });
  console.log(user);
}

////===============================================================================================================================
//// Lec 45:11 - Advanced Filtering

// how to perform advance filetering

// how to return all the data distinct on certain parameetes

async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: "Sally",
    },
    distinct: ["name"],
  });
  console.log(user);
}

// How to apply pagination
// take

async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: "Sally",
    },
    take: 2,
  });
  console.log(user);
}

// how to paginate and skip
async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: "Sally",
    },
    take: 2,
    skip: 1,
  });
  console.log(user);
}

// how to perform sorting
// orderBy

async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: "Sally",
    },
    orderBy: {
      age: "asc", // "desc"
    },
  });
  console.log(user);
}

// find with exact data
// equals
async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: { equals: "Sally" },
    },
  });
  console.log(user.length);
}

// find the data which is not equal to given parameter
async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: { not: "Sally" },
    },
  });
  console.log(user.length);
}

//find all the users with given prameters
// in -> clause

async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: { in: ["Sally", "Kyle"] },
    },
  });
  console.log(user.length);
}

//find all the users not in given prameters
// notIn -> clause

async function main() {
  const user = await prisma.user.findMany({
    where: {
      name: { notIn: ["Sally", "Kyle"] },
    },
  });
  console.log(user);
}

// less than
// lt
async function main() {
  const user = await prisma.user.findMany({
    where: {
      age: { lt: 20 }, //gt (greater than), //gte (greater than equals to) // lte (less than equals to)
    },
  });
  console.log(user);
}

// check if text is contains inside of another text
// contains
async function main() {
  const user = await prisma.user.findMany({
    where: {
      email: { contains: "@test.com" },
    },
  });
  console.log(user);
}

// check if the given text ends with certain parameters
async function main() {
  const user = await prisma.user.findMany({
    where: {
      email: { endsWith: ".com" }, // startsWith
    },
  });
  console.log(user.length);
}

// AND -> on query
async function main() {
  const user = await prisma.user.findMany({
    where: {
      AND: [{ email: { endsWith: ".com" } }, { name: "Sally" }],
    },
  });
  console.log(user.length);
}

// OR -> on query

async function main() {
  const user = await prisma.user.findMany({
    where: {
      OR: [{ email: { endsWith: ".com" } }, { age: { gte: 30 } }],
    },
  });
  console.log(user);
}

// NOT query

async function main() {
  const user = await prisma.user.findMany({
    where: {
      NOT: [{ email: { startsWith: "sally" } }],
    },
  });
  console.log(user);
}
////===============================================================================================================================
//// Lec 49:28 - Relationship Filtering

// how to perform the queries on relationships
async function main() {
  const user = await prisma.user.findMany({
    where: {
      userPreference: {
        //relationship
        emailUpdates: true,
      },
    },
  });
  console.log(user);
}

// find every qurery matches with these parameters

async function main() {
  const user = await prisma.user.findMany({
    where: {
      writtenPosts: {
        every: {
          title: "Test",
        },
      },
    },
  });
  console.log(user);
}
// find some queries written with
async function main() {
  const user = await prisma.user.findMany({
    where: {
      writtenPosts: {
        some: {
          title: { startsWith: "name" },
        },
      },
    },
  });
  console.log(user);
}

// Note: All the queries that we have talked about can be nested infinte level deep

// relationship filtering
async function main() {
  const user = await prisma.post.findMany({
    where: {
      author: {
        is: {
          // isNot
          age: 27,
        },
      },
    },
  });
  console.log(user);
}

// this all cover about tehe reading data
////===============================================================================================================================
//// Lec 52:07 - Client Update Operations

// update -> udate first user it finds
//Note: update must be done on unique field
async function main() {
  const user = await prisma.user.update({
    where: {
      email: "sally@test.com",
    },
    data: {
      email: "sally@testupdate.com",
    },
  });
  console.log(user);
}

//EX-2 // increment //decrement, // multiply, //divide clause
async function main() {
  const user = await prisma.user.update({
    where: {
      email: "sally@test.com",
    },
    data: {
      age: {
        increment: 1, //decrement, // multiply, //divide
      },
    },
  });
  console.log(user);
}

// udateMany -> update all the users it find
async function main() {
  const user = await prisma.user.updateMany({
    where: {
      email: "sally@test.com",
    },
    data: {
      email: "sally@testupdate.com",
    },
  });
  console.log(user);
}

////===============================================================================================================================
//// Lec 55:02 - Connect Existing Relationships

// add and connect different relations to the user by updating

async function main() {
  const user = await prisma.user.update({
    where: {
      email: "sally@test.com",
    },
    data: {
      userPreference: {
        // connecting relation
        create: {
          emailUpdates: true,
        },
      },
    },
  });
  console.log(user);
}
// connecting the user preference that already exist
// What happens if we had a user preference that already exist
// ans-> it will form a connection

async function main() {
  const user = await prisma.user.update({
    where: {
      email: "sally@test.com",
    },
    data: {
      userPreference: {
        connect: {
          id: "0514a883-ca57-432c-aac7-34f3a2ba12a7",
        },
      },
    },
  });
  console.log(user);
}

// how to disconnect the existing relation

async function main() {
  const user = await prisma.user.update({
    where: {
      email: "sally@test.com",
    },
    data: {
      userPreference: {
        disconnect: true,
      },
    },
  });
  console.log(user);
}
// Note: we can connect everytime we do a creation and disconnect everytime we do updates

////===============================================================================================================================
//// Lec 57:52 - Client Delete Operations

// delete clause -> can be applied using field which is unique
// and delete only one item.
async function main() {
  const user = await prisma.user.delete({
    where: {
      email: "kyle@test.com",
    },
  });
  console.log(user);
}

// deleteMany-> it deletes all the item which matches the given parameter
async function main() {
  const user = await prisma.user.deleteMany({
    where: {
      age: { lt: 20 },
    },
  });
  console.log(user);
}

// deleteMany()-> to delete everything present in the given relation
async function main() {
  const user = await prisma.user.deleteMany();
  console.log(user);
}
////===============================================================================================================================
