import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export default () => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger className="button fcc w-7.5 h-7.5 rounded-md border border-base focus:outline-0">
      <div className="i-ph:list" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content className="ml-3 mb-1 min-w-160px">
        <DropdownMenu.Item asChild>
          <a href="/" className="flex items-center gap-2">
            <div className="i-ph:cat" />
            <span className="text-sm">歌词</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <a href="/setlist" className="flex items-center gap-2">
            <div className="i-ph:folder-open" />
            <span className="text-sm">演唱会歌单</span>
          </a>
        </DropdownMenu.Item>
        <DropdownMenu.Item asChild>
          <a href="/stats" className="flex items-center gap-2">
            <div className="i-ph:chart-bar" />
            <span className="text-sm">统计</span>
          </a>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
)