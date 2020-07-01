# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

### Association
- has_many :comments
- has_many :users_groups
- has_many :groups,through::group_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :comments
- has_many :users_groups
- has_many :users

## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|text|	
|user_id|integer|null: false,foreign_key: true|
|group_id|inteer|null: false,foreign_key: true|

### Association
- belong_to :user
- belong_to :group

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belong_to :user
- belong_to :group