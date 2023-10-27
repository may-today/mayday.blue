import * as Dialog from '@radix-ui/react-dialog'

export default () => (
  <Dialog.Root>
    <Dialog.Trigger className="bg-transparent p-1 fg-lighter">
      <div className="i-ph:info" />
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent radix">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <Dialog.Title className="DialogTitle">关于演唱会歌单</Dialog.Title>
        </div>
        <div className="p-6 pt-3">
          <p className="text-sm leading-relaxed fg-lighter">歌单原始数据来自互联网，由 <a className="fg-base" target="_blank" href="https://ddiu.io">Diu</a> 进行数据统计。目前收录场次未覆盖完全，历史数据逐步补充中。</p>
          <p className="text-sm leading-relaxed fg-lighter mt-3">歌单来源</p>
          <p className="text-sm leading-relaxed fg-lighter">- <a className="fg-base" target="_blank" href="https://docs.google.com/spreadsheets/d/1pvDc5SmF6Rsw2chkiZkNn6I4JJDleRVLb5yOKAbm8Ck">五月天MayDay演唱會歌單 - Google 表格</a> - 由台湾五迷老师整理</p>
          <p className="text-sm leading-relaxed fg-lighter">- Mayday.Live 公众号 - 主要由大陆五迷老师整理</p>
          <p className="text-sm leading-relaxed fg-lighter mt-3">歌词来源</p>
          <p className="text-sm leading-relaxed fg-lighter">来源互联网，部分内容有修改</p>
          <p className="text-sm leading-relaxed fg-lighter mt-3">鸣谢</p>
          <p className="text-sm leading-relaxed fg-lighter">@Ringomango @LeseTruck</p>
        </div>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <Dialog.Close className="absolute top-4 right-4 fcc w-8 h-8 bg-transparent">
            <div className="i-ph:x text-lg" />
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)