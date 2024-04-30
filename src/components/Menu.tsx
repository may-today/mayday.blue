import { Popover } from '@ark-ui/react'

export default () => (
  <Popover.Root modal portalled>
    <Popover.Trigger className="button bg-base fcc w-7.5 h-7.5 rounded-md border border-base focus:outline-0">
      <div className="i-ph:list" />
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content className="ml-3 mb-1 min-w-160px">
        <a href="/" className="collection-item flex items-center gap-2">
          <div className="i-ph:cat" />
          <span className="text-sm">歌词</span>
        </a>
        <a href="/setlist" className="collection-item flex items-center gap-2">
          <div className="i-ph:folder-open" />
          <span className="text-sm">演唱会歌单</span>
        </a>
        <a href="/stats" className="collection-item flex items-center gap-2">
          <div className="i-ph:chart-bar" />
          <span className="text-sm">统计</span>
        </a>
        <a href="https://screen.mayday.blue" target="_blank" className="collection-item flex items-center gap-2">
          <div className="i-ph:projector-screen" />
          <span className="text-sm">提词器</span>
        </a>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
  // <DropdownMenu.Root onOpenChange={e => { console.log(e) }}>
  //   <DropdownMenu.Portal>
  //     <DropdownMenu.Content>
  //       <DropdownMenu.Item asChild>
  //         <a href="/" className="flex items-center gap-2">
  //           <div className="i-ph:cat" />
  //           <span className="text-sm">歌词</span>
  //         </a>
  //       </DropdownMenu.Item>
  //       <DropdownMenu.Item asChild>
  //         <a href="/setlist" className="flex items-center gap-2">
  //           <div className="i-ph:folder-open" />
  //           <span className="text-sm">演唱会歌单</span>
  //         </a>
  //       </DropdownMenu.Item>
  //       <DropdownMenu.Item asChild>
  //         <a href="/stats" className="flex items-center gap-2">
  //           <div className="i-ph:chart-bar" />
  //           <span className="text-sm">统计</span>
  //         </a>
  //       </DropdownMenu.Item>
  //     </DropdownMenu.Content>
  //   </DropdownMenu.Portal>
  // </DropdownMenu.Root>
)