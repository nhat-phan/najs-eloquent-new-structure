## Relations types

### HasOne

User has one Phone:

```typescript
const User_HasOne_Phone = {
  local: { model: 'User', target: 'users', key: 'id' },

  foreign: { model: 'Phone', target: 'phones', key: 'user_id' },

  rootMapTo: 'local'
}

// Query
User.phone => Phone.where('user_id', this.rootModel.id).first()

// --------------

const User_HasOne_Phone_v2 = {
  based: { model: 'User', target: 'users', key: 'id' },

  referred: { model: 'Phone', target: 'phones', key: 'user_id' },
}

// Query
// referred.where( referred.key, basedInstance[based.key] ).first()
User.phone => Phone.where('user_id', this.rootModel.id).first()
```

Phone belongs to User

```typescript
const Phone_Belongs_To_User = {
  local: { model: 'User', target: 'users', key: 'id' },

  foreign: { model: 'Phone', target: 'phones', key: 'user_id' },

  rootMapTo: 'foreign'
}

// Query
Phone.user => User.where('id', this.rootModel.user_id).first()

// --------------

const Phone_Belongs_To_User_v2 = {
  referencing: { model: 'Phone', target: 'phones', key: 'user_id' },

  referenced: { model: 'User', target: 'users', key: 'id' },
}

// Query
// Referenced.where( Referenced.key, ReferencingInstance[Referencing.key] ).first()
Phone.user => User.where('id', this.rootModel.user_id).first()
```

### HasMany

#### Normal case

User has many posts:

```typescript
const User_HasMany_Posts = {
  local: { model: 'User', target: 'users', key: 'id' },

  foreign: { model: 'Post', target: 'posts', key: 'user_id' },

  rootMapTo: 'local'
}

// Query
User.posts => Post.where('user_id', this.rootModel.id).get()

// --------------

const User_HasMany_Posts_v2 = {
  referencing: { model: 'User', target: 'users', key: 'id' },

  referenced: { model: 'Post', target: 'posts', key: 'user_id' },
}

// Query
// Referenced.where( Referenced.key, ReferencingInstance[Referencing.key] ).first()
User.posts => Post.where('user_id', this.rootModel.id).get()
```

Phone belongs to User

```typescript
const Post_Belongs_To_User = {
  local: { model: 'User', target: 'users', key: 'id' },

  foreign: { model: 'Post', target: 'posts', key: 'user_id' },

  rootMapTo: 'foreign'
}

// Query
Post.user => User.where('id', this.rootModel.user_id).first()

// --------------

const Post_Belongs_To_User_v2 = {
  referencing: { model: 'Post', target: 'posts', key: 'user_id' },

  referenced: { model: 'User', target: 'users', key: 'id' },
}

// Query
// Referenced.where( Referenced.key, ReferencingInstance[Referencing.key] ).first()
Post.user => User.where('id', this.rootModel.user_id).first()
```

#### Edge case: recursive relation

User belongs to User/supervisor:

```typescript
const User_BelongsTo_Supervisor = {
  local: { model: 'User', target: 'users', key: 'supervisor_id' },

  foreign: { model: 'User', target: 'users', key: 'id' },

  rootMapTo: 'local'
}

// Query
User.supervisor => User.where('id', this.rootModel.supervisor_id).first()

// --------------

const User_HasOne_Supervisor_v2 = {
  referencing: { model: 'User', target: 'users', key: 'supervisor_id' },

  referenced: { model: 'User', target: 'users', key: 'id' },
}

// Query
// Referenced.where( Referenced.key, ReferencingInstance[Referencing.key] ).first()
User.supervisor => User.where('id', this.rootModel.supervisor_id).first()
```

User/supervisor has many Users:

```typescript
const Supervisor_HasMany_User = {
  local: { model: 'User', target: 'users', key: 'id' },

  foreign: { model: 'User', target: 'users', key: 'supervisor_id' },

  rootMapTo: 'local'
}

// Query
User.subordinates => User.where('supervisor_id', this.rootModel.id).get()
```

### Morph

User has one Image:

```typescript
const User_HasOne_Image = {
  local: { model: 'User', target: 'users', key: 'id' },

  foreign: { model: 'Image', target: 'images', morph_type: 'image_type', morph_id: 'image_id' },

  rootMapTo: 'local'
}

// Query
User.phone => Phone.where('image_type', 'Something').where('image_id', this.rootModel.id).first()
```

Image belongs to User

```typescript
const Image_Belongs_To_User = {
  local: { model: 'User', target: 'users', key: 'id' },

  foreign: { model: 'Image', target: 'images', morph_type: 'image_type', morph_id: 'image_id' },

  rootMapTo: 'foreign'
}

### ManyToMany

Book has many Authors
```

const Book_HasMany_BookAuthor = {
local: { model: 'Book', target: 'books', key: 'id' },

foreign: { model: 'BookAuthor', target: 'book_authors', key: 'book_id' },

rootMapTo: 'local'
}

// Query
Book.authors => Book.book_authors.book

```

```
