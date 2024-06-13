'use client';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Button, Box  } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
export default function MainDashboard() {
    const { quotes, isLoading } = useSelector((state) => state.quotes);
    return (
        <div class="mx-auto py-6 sm:px-6 lg:px-8">
            <div class="w-full py-6">
                <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h2 class="text-xl font-bold mb-4">Statistik</h2>
                        </div>
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h2 class="text-xl font-bold mb-4">Grafik</h2>
                        </div>
                        <div className='col-span-full'>                            
                            <Tabs>
                                <TabList className="flex justify-start space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-t-lg">
                                    <Tab
                                        className="px-4 py-2 text-sm font-semibold text-white rounded-md hover:bg-white hover:text-blue-600 focus:outline-none transition duration-300 ease-in-out"
                                        _selected={{ bg: 'white', color: 'black', shadow: 'md' }}
                                    >
                                        One
                                    </Tab>
                                    <Tab
                                        className="px-4 py-2 text-sm font-semibold text-white rounded-md hover:bg-white hover:text-blue-600 focus:outline-none transition duration-300 ease-in-out"
                                        _selected={{ bg: 'white', color: 'black', shadow: 'md' }}
                                    >
                                        Two
                                    </Tab>
                                    <Tab
                                        className="px-4 py-2 text-sm font-semibold text-white rounded-md hover:bg-white hover:text-blue-600 focus:outline-none transition duration-300 ease-in-out"
                                        _selected={{ bg: 'white', color: 'black', shadow: 'md' }}
                                    >
                                        Three
                                    </Tab>
                                </TabList>

                                <TabPanels className="bg-white p-4 rounded-b-lg shadow-md">
                                    <TabPanel>
                                        <Button borderTopRadius="md">Jumlah questes hari adalah {isLoading ? "null" : quotes.length}</Button>
                                        <Box
                                            backgroundImage="url('https://images6.alphacoders.com/134/1346530.jpeg')"
                                            backgroundPosition="center"
                                            backgroundRepeat="no-repeat"
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <p className="text-gray-800">Two!</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p className="text-gray-800">Three!</p>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}