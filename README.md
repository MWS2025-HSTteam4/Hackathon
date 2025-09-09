# MWS2025のハッカソン事前課題作成用リポジトリ
* タイトル未定
* セキュリティテーマのSlay the Spire ライクなカードゲームを作成する
* セキュリティ初学者を対象にセキュリティに関する事物に触れてもらうことで，それぞれがどんな関係性にあるのかを直感的に知ってもらったり，純粋に興味を持ってもらうことを目的に開発する


# 実行方法
* Phaser環境下で実行可能
* Pythonインストール済みならコードをダウンロード後，以下で実行可能
```
$ python -v：pythonがインストールされている確認
$ cd [index.htmlがあるフォルダ]
$ python -m http.server 8000
ブラウザで「http://localhost:8000/index.html」で開ける
```
* 将来的には，これらを統合したファイルを一つのファイルとして作成し，単純に開くだけでブラウザで実行できる形を実装予定

# github 使い方ガイド（自分用）
```
参考サイト：https://wayasblog.com/github-upload/
$ git --version：gitがインストールされていることの確認，厳密にはバージョンの確認
$ git status：現在の状態を確認できる（どのファイルが更新されているか）
```

## 初期設定：リポジトリにしたいフォルダで以下を実行
```
$ git init：リポジトリを新規作成
$ git add .：インデックス（保存対象を登録する場所）にファイル後進を反映
$ git status：現在の状態を確認できる（どのファイルが更新されているか）
$ git commit -m "first commit"：-mオプションが何かわからん．後ろのはどういう意図のcommitかのコメント
$ git remote add origin [URL]：originという名前に対して，[URL]を関連付ける
  今回の場合は，[URL]：https://github.com/MWS2025-HSTteam4/Hackathon.git
  $ git remote add origin https://github.com/MWS2025-HSTteam4/Hackathon.git
$ git branch -M main：-Mオプションが何かわからんが，mainブランチを作ってるんだとは思う
$ git push -u origin master：-uオプションが分からんが，originにpushしてる？masterも分からん．もしかしたらmaster→mainかも
```

## 編集用
```
$ git clone [URL]：[URL]のリポジトリを現在のフォルダにダウンロード（クローン・複製）する
  今回の場合は $ git clone https://github.com/MWS2025-HSTteam4/Hackathon.git
$ git add .：変更してあるファイルをすべてインデックスに追加する
$ git commit -m "どんな変更か"：コメントを付けてコミットする
$ git push：リモートリポジトリに変更を反映する
```

## ブランチの仕方
* 参考サイト：https://qiita.com/takamii228/items/80c0996a0b5fa39337bd
* なんかpull requsetとかなんかあった気がするんだけど分からん
```
$ git branch --contains=HEAD：現在のブランチを確認する．
  後ろのオプション無しでも一応見れたが，多分今下の方のブランチにいる時にこのオプションを入れないとそれ以下のブランチしか見れないと推測
$ git checkout -b feature/{branchname}：ブランチの作成・移動
  {branchname}は任意の名前でいいが，何を開発するのかが分かる名前にするのが通例
  分割して実行することもできる
  $ git branch feature/{branchname}：ブランチ作成
  $ git checkout feature/{branchname}：ブランチ移動
$ git add {filename}：変更対象ファイルをすべて{filename}に入れてaddする
  めんどくさいときは $ git add .で全部入れてもいい気がするが，事故が起こるらしいので一つずつのがよさそう
$ git reset：addを取り消す
  全部消える．一つずつ指定もできる $ git reset {filename}
$ git commit -m "コメント"
  $ git commitでもいいが，その場合viが起動してそこでコメントを書く必要があるのでvi苦手なら上のコマンドの方が楽そう
  $ git commit --amend：直前のコミットを修正．間違ってコミットした場合の修正
  $ git status：現在のリポジトリの状態確認
$ git fetch：リモートの変更をローカルに取り込む
  $ git rebase origin/master：リモートのmasterの変更をローカルのfeatureブランチに取り込む
$ git push origin feature/{branchname}：featureブランチをリモートリポジトリにpushする
Gitのホスティングサービスのサイト画面でpull requestを作成する：このページのどっかにあるはず，この前の手順でpushをしていたら
$ git checkout master
```
## 操作した結果
```
$ git checkout -b feature/{branchname}：ブランチの作成・移動
$ git branch：現在のブランチのチェック
$ git add .：編集後にこれでインデックスに追加
$ git commit -m "コメント"：commitする
ここまででコマンドラインでの作業は終わり
githun上でpull requestを作成
マージする
フェッチ系はまだわかってない
```





