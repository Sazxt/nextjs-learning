"use client"
import { AppstoreOutlined, MailOutlined, SettingOutlined, HomeOutlined, ExceptionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { usePathname, useRouter  } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    console.log(pathname)
    const items = [
        {
            key: '/admin/dashboard',
            label: 'Dashboard',
            icon: <HomeOutlined />,
            onClick: () => router.push('/admin/dashboard'),
        },
        {
            key: '/admin/test',
            label: 'test',
            icon: <ExceptionOutlined />,
            onClick: () => router.push('/admin/test'),
        },
        {
            key: 'sub1',
            label: 'Navigation One',
            icon: <MailOutlined />,
            children: [
                {
                    key: 'g1',
                    label: 'Item 1',
                    type: 'group',
                    children: [
                        {
                            key: '1',
                            label: 'Option 1',
                        },
                        {
                            key: '2',
                            label: 'Option 2',
                        },
                    ],
                },
                {
                    key: 'g2',
                    label: 'Item 2',
                    type: 'group',
                    children: [
                        {
                            key: '3',
                            label: 'Option 3',
                        },
                        {
                            key: '4',
                            label: 'Option 4',
                        },
                    ],
                },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <AppstoreOutlined />,
            children: [
                {
                    key: '5',
                    label: 'Option 5',
                },
                {
                    key: '6',
                    label: 'Option 6',
                },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        {
                            key: '7',
                            label: 'Option 7',
                        },
                        {
                            key: '8',
                            label: 'Option 8',
                        },
                    ],
                },
            ],
        },
        {
            type: 'divider',
        },
        {
            key: 'sub4',
            label: 'Navigation Three',
            icon: <SettingOutlined />,
            children: [
                {
                    key: '9',
                    label: 'Option 9',
                },
                {
                    key: '10',
                    label: 'Option 10',
                },
                {
                    key: '11',
                    label: 'Option 11',
                },
                {
                    key: '12',
                    label: 'Option 12',
                },
            ],
        },
        {
            key: 'grp',
            label: 'Group',
            type: 'group',
            children: [
                {
                    key: '13',
                    label: 'Option 13',
                },
                {
                    key: '14',
                    label: 'Option 14',
                },
            ],
        },
    ];
    const onClick = (e) => {

    };
    return (
        <aside className="bg-white min-h-screen">
            <div className="">
                <div className='p-[16px] flex justify-center items-center'>
                    <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
                </div>
                <Menu
                    onClick={onClick}
                    style={{
                        width: 256,
                    }}
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={['sub1', 'sub2', 'sub4']}
                    mode="inline"
                    items={items}
                />
            </div>
        </aside>
    );
}