/** 定时检测器 */
export const inspectTimer = (
  callback: (count: number) => boolean | Promise<boolean>,
  options?: { time: number; maxCount: number }
) => {
  const { time = 20, maxCount = 100 } = options || {}
  const isAsync = callback.constructor.name === 'AsyncFunction'

  return new Promise<void>(resolve => {
    let count = 0

    /** 同步函数使用 setIntervalue, 异步函数使用 setTimeout */
    if (isAsync) {
      const next = async () => {
        count++

        try {
          if (count > maxCount || (await callback(count))) {
            return resolve()
          }
        } catch (e) {
          console.error('inspectTimer 出错', e)
          return resolve()
        }

        const timer = setTimeout(() => {
          clearTimeout(timer)
          next()
        }, time)
      }

      next()
    } else {
      const timer = setInterval(() => {
        const done = () => {
          clearInterval(timer)
          resolve()
        }

        count++

        try {
          if (count > maxCount || callback(count)) done()
        } catch (e) {
          done()
          console.error('inspectTimer 出错', e)
        }
      }, time)
    }
  })
}

/** 传入一个时间戳，返回一个日期字符串 */
export const getDate = ({ time, full, offsetOption = {} }) => {
  /** 生成一个日期对象 */
  const date = new Date(time)
  /** 数值如果小于10, 则补0 */
  const judge = (key, offset = 0) => {
    const value = date[key]() + (offsetOption[key] || 0) + offset
    return value < 10 ? `0${value}` : value
  }
  /** 生成 年-月-日 */
  const transfromDate1 = `${judge('getFullYear')}-${judge(
    'getMonth',
    1
  )}-${judge('getDate')}`
  /** 生成 年-月-日 时:分:秒 */
  const transfromDate2 = `${transfromDate1} ${judge('getHours')}:${judge(
    'getMinutes'
  )}:${judge('getSeconds')}`

  return full ? transfromDate2 : transfromDate1
}

/** 获取一个指定范围的随机数 */
export const getRandom = (max: number, min = 0) => {
  return min + Math.ceil(Math.random() * (max - min))
}

/** 获取一个20位长度的随机id */
export const getId = () => {
  return Math.random().toString().slice(2) + getRandom(9999)
}
