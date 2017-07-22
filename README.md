# node-lambda sample

## overview
node-lambdaはws-sdkをラップしていて、ローカル実行したり、deployしたりできる。

## quickstart
事前にlambdaを実行するためのAWSロールが必要です。

```
### setting up
$ npm install --save node-lambda
$ $(npm bin)/node-lambda setup

### make & run locally your lambda!
$ touch index.js
$(npm bin)/node-lambda run

### for deplyment, overwrite your lambda role arn & region & function name(OS X)
sed -i '' 's/\(AWS_ROLE_ARN=\).*/\1<your_lambda_arn>/' .env
sed -i '' 's/\(AWS_REGION=\).*/\1<your_region>/' .env
sed -i '' 's/\(AWS_FUNCTION_NAME=\).*/\1<your_lambda_name>/' .env

### deploy
$ $(npm bin)/node-lambda deploy

## you can confirm deployment, if you have done aws-cli setting up.(require jq)
$ aws lambda list-functions | jq .Functions[].FunctionName | grep node
-lambda-sample
"node-lambda-sample-development"
```

## notice
### AWS-cliの設定が済んでいれば、.envにcredentialの情報は不要
内部でAWS-SDKを利用しているので、AWS-SDKのセットアップが済んでいれば、

.env内のAWS_ACCESS_KEY_IDやAWS_SECRET_ACCESS_KEYは記載不要

### diskに空きが少ない時のdeployは注意
deployコマンドでは、改めて別ディレクトリに本番用にパッケージングを行うので、容量が必要になる。

## setting up log

### なにはともあれgitignore

```
$ git init
```

### 本体を入れる

検証なのでとりあえずグローバルにはいれない
```
$ npm install --save node-lambda
```


### セットアップコマンドを実行

公式の通り。.envで環境変数というがデプロイ用の設定か？
```
$ $(npm bin)/node-lambda setup
Running setup.
/Users/iida-ryota/Documents/aws/node-lambda-sample/.env file successfully created
/Users/iida-ryota/Documents/aws/node-lambda-sample/event.json file successfully created
/Users/iida-ryota/Documents/aws/node-lambda-sample/deploy.env file successfully created
/Users/iida-ryota/Documents/aws/node-lambda-sample/context.json file successfully created
/Users/iida-ryota/Documents/aws/node-lambda-sample/event_sources.json file successfully created
Setup done. Edit the .env, deploy.env, context.json and event.json files as needed.
```

### .gitignore設定
このsampleではnnode_modulesも足しておいた
```
echo -e ".env\ndeploy.env\nevent.json\n.lambda\nnode_modules\/*" >> .gitignore
```
