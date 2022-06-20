/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/nexus/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Auth: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Card: { // root type
    categoryId?: number | null; // Int
    details: string; // String!
    done: boolean; // Boolean!
    id: number; // Int!
    title: string; // String!
  }
  Category: { // root type
    id: number; // Int!
    name: string; // String!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Auth: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Card: { // field return type
    categoryId: number | null; // Int
    details: string; // String!
    done: boolean; // Boolean!
    id: number; // Int!
    title: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
  }
  Category: { // field return type
    cards: Array<NexusGenRootTypes['Card'] | null>; // [Card]!
    id: number; // Int!
    name: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
  }
  Mutation: { // field return type
    createCard: NexusGenRootTypes['Card']; // Card!
    createCategory: NexusGenRootTypes['Category']; // Category!
    deleteCard: NexusGenRootTypes['Card']; // Card!
    login: NexusGenRootTypes['Auth']; // Auth!
    markDone: NexusGenRootTypes['Card']; // Card!
    signup: NexusGenRootTypes['Auth']; // Auth!
    updateCard: NexusGenRootTypes['Card']; // Card!
  }
  Query: { // field return type
    allCards: NexusGenRootTypes['Card'][]; // [Card!]!
    allCategories: NexusGenRootTypes['Category'][]; // [Category!]!
  }
  User: { // field return type
    cards: Array<NexusGenRootTypes['Card'] | null>; // [Card]!
    categories: Array<NexusGenRootTypes['Category'] | null>; // [Category]!
    email: string; // String!
    id: number; // Int!
    name: string; // String!
    password: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Auth: { // field return type name
    token: 'String'
    user: 'User'
  }
  Card: { // field return type name
    categoryId: 'Int'
    details: 'String'
    done: 'Boolean'
    id: 'Int'
    title: 'String'
    user: 'User'
  }
  Category: { // field return type name
    cards: 'Card'
    id: 'Int'
    name: 'String'
    user: 'User'
  }
  Mutation: { // field return type name
    createCard: 'Card'
    createCategory: 'Category'
    deleteCard: 'Card'
    login: 'Auth'
    markDone: 'Card'
    signup: 'Auth'
    updateCard: 'Card'
  }
  Query: { // field return type name
    allCards: 'Card'
    allCategories: 'Category'
  }
  User: { // field return type name
    cards: 'Card'
    categories: 'Category'
    email: 'String'
    id: 'Int'
    name: 'String'
    password: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createCard: { // args
      category: string; // String!
      details: string; // String!
      title: string; // String!
    }
    createCategory: { // args
      name: string; // String!
    }
    deleteCard: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    markDone: { // args
      id: number; // Int!
    }
    signup: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
    updateCard: { // args
      details?: string | null; // String
      id: number; // Int!
      title?: string | null; // String
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}