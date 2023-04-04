export type ModeType = 'none' | 'relativeName'

export type CustomNameFn = (id: string) => string
export interface Options {
  mode?: ModeType | CustomNameFn
  enableSupportRef?: boolean
}
