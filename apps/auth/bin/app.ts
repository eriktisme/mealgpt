#!/usr/bin/env node
import 'source-map-support/register'
import { App } from 'aws-cdk-lib'
import { AuthStack } from '../lib'

const app = new App()

const prefix = app.node.tryGetContext('prefix') || 'prod'
const clientId = app.node.tryGetContext('clientId') || ''
const clientSecret = app.node.tryGetContext('clientSecret') || ''
const domain = getDomain(app.node.tryGetContext('domain') || '', prefix)

new AuthStack(app, `${prefix}-mealgpt-auth`, {
  domain,
  env: {
    region: 'eu-west-1',
  },
  google: {
    clientId,
    clientSecret,
  },
  prefix,
  tags: {
    environment: prefix,
    project: 'mealgpt',
  },
})

function getDomain(domain: string, prefix: string) {
  let result = `${prefix}.envs.${domain}`

  if (['staging', 'prod'].includes(prefix)) {
    result = domain
  }

  return result
}