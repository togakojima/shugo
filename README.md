
# アプリ概要
チャット機能で自分の思考をつぶやいて整理したり複数人で雑談もできるプライベートチャットアプリです。
マップ機能やカレンダー機能を利用して、アプリ内で今後の予定、行きたいところを記録して思考整理の補助をします。


# 今後の実装する機能（予定）

- グループチャットで自分と他ユーザーのメッセージを見やすくなるように区別する
- ルームにパスワードを設定し、ルームに入れるユーザーを制限する機能
- マップで行きたい場所を確認、共有できる機能
- カレンダーで今後の予定をその場でメモ、過去の予定も後から見返せる機能


# テーブル設計

## users テーブル

| Column             | Type   | Options     |
| ------------------ | ------ | ----------- |
| nickname           | string | null: false |
| email              | string | null: false, unique: true |
| encrypted_password | string | null: false |

### Association

- has_many :room_users
- has_many :rooms, through: :room_users
- has_many :messages

## rooms テーブル

| Column          | Type   | Options     |
| --------------- | ------ | ----------- |
| roomname        | string | null: false |
| password_digest | string |             |

### Association

- has_many :room_users
- has_many :users, through: :room_users
- has_many :messages

## room_users テーブル

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| user   | references | null: false, foreign_key: true |
| room   | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user

## messages テーブル

| Column  | Type       | Options                        |
| ------- | ---------- | ------------------------------ |
| content | string     |                                |
| user    | references | null: false, foreign_key: true |
| room    | references | null: false, foreign_key: true |

### Association

- belongs_to :room
- belongs_to :user