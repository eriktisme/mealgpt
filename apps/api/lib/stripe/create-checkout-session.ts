import { Construct } from 'constructs'
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync'
import { NodejsLambda, AppsyncResolver } from '@mealgpt/cdk-utils'
import { Secret } from 'aws-cdk-lib/aws-secretsmanager'

interface CreateCheckoutSessionProps {
  domain: string
  prefix: string
  api: GraphqlApi
  stripeApiToken: Secret
}

export class CreateCheckoutSession extends Construct {
  constructor(scope: Construct, props: CreateCheckoutSessionProps) {
    const id = 'create-checkout-session'

    super(scope, id)

    const handler = new NodejsLambda(this, `${id}-handler`, {
      entry: './src/functions/mutations/createStripeCheckoutSession/index.ts',
      environment: {
        DOMAIN: props.domain,
        PREFIX: props.prefix,
        STRIPE_API_TOKEN_ID: props.stripeApiToken.secretName,
      },
    })

    handler.grantDynamoDBTableReadWriteAccess(
      props.prefix,
      'MealGPTStripeCustomers'
    )

    handler.grantDynamoDBTableReadAccess(
      props.prefix,
      'MealGPTStripeSubscriptions'
    )

    props.stripeApiToken.grantRead(handler)

    new AppsyncResolver(this, id, {
      api: props.api,
      handler,
      resolver: {
        typeName: 'Mutation',
        fieldName: 'createStripeCheckoutSession',
      },
    })
  }
}
