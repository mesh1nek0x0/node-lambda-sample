# node-lambda sample

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
