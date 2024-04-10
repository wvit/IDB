## 开箱即用 IndexedDB 增删改查方法

[查看文档](https://wvit.github.io/idb/)

[查看主页](https://github.com/wvit/vtils) 

[下载](https://www.npmjs.com/package/@vorker/idb)

### 使用
``` typescript
// idb.ts
import { Handle, IDB } from '@vorker/idb'

/** 实例化数据库 */
const db = new IDB({
  name: 'indexedDB-name',
  storeNames: ['users'] as const,
  objectNames: ['globalConfig'] as const,
})

/** 生成数据表的操作方法 */
export const { storeHandles, objectHandles } = new Handle({ db })

///////////////////////////////

// user.ts
import { storeHandles, objectHandles } from './idb.ts'

/** 新建用户 */
const createUser = () => {
  const status = await storeHandles.users.create({ name: 'test' })
  if (status) console.log('添加成功')
}

/** 删除用户 */
const deleteUser = (userId: string) => {
  const status = await storeHandles.users.delete(userId)
  if (status) console.log('删除成功')
}

/** 更新用户数据 */
const updateUser = (userId: string) => {
  const status = await storeHandles.users.update({ id: userId, name: 'hello' })
  if (status) console.log('编辑成功')
}

/** 获取用户列表 */
const getUserList = () => {
  const { list } = await storeHandles.users.getPage({ pageNo: 1, pageSize: 10 })
  if (list.length) console.log('前10位用户', list)
}
```
更多方法请参考文档 [StoreHandle](https://wvit.github.io/idb/)