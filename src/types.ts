export type ModeType = 'none' | 'fileName' | 'relativeName'

export type CustomNameFn = (id: string) => string
export interface Options {
  mode?: ModeType | CustomNameFn
}
