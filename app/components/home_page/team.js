"use client"
import React, {
    useCallback,
    useMemo,
    useRef,
    useEffect,
    useState,
    StrictMode,
} from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import TeamComponentModel from "../Components/teamComponentModal";
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const DeleteButtonRenderer = (props) => {
    const { onClick } = props;
    return (
        <div className="flex justify-center items-center mt-[4px]">
            <button
                className="h-[32px] px-[7px] flex p-[1px] items-center text-red-500 rounded-md hover:bg-red-600 hover:text-white border-[1px] border-red-500"
                onClick={onClick}
                data-id={props.value}
            >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Delete
            </button>
        </div>
    );
};

export default function TeamComponent() {
    const [rowData, setRowData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const gridRef = useRef(null);
    const fetchData = async (currentPage) => {
        try {
            const response = await fetch('/api/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"curentPage" : currentPage})
            });
            const data = await response.json();
            setRowData(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addData = () => {
        const newData = {
            name: 'New Make',
            email: 'email' + Math.floor(Math.random() * 100000) + "@gmail.com",
            };
        setRowData([...rowData, newData]);
    };

    const getServerSideDatasource = () => {
        return {
            getRows: async (params) => {
                console.log(JSON.stringify(params.request, null , 1))
                const {startRow, endRow} = params.request
                try {
                    const response = await fetch('/api/data', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            startRow: params.request.startRow,
                            endRow: params.request.endRow,
                            pageSize: params.request.endRow - params.request.startRow,
                            currentPage: params.request.startRow / (params.request.endRow - params.request.startRow) + 1,
                        }),
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        params.success({
                            rowData: data.rows,
                            rowCount: data.lastRow,
                        });
                    } else {
                        params.fail();
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    params.fail();
                }
            },
        };
    };

    const onCellValueChanged = useCallback(async (params) => {
        const { data } = params;
        try {
            const response = await fetch('/api/update-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                console.error('Error updating data:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }, []);
    
    const onGridReady = useCallback((params) => {
        const datasource = getServerSideDatasource();
        params.api.setServerSideDatasource(datasource);
        gridRef.current = params.api;
    }, []);

    const refreshData = () => {
        console.log(gridRef)
        gridRef.current.refreshServerSide({ route: undefined, purge: true })
    };

    const data_input = [
        {
            "name" : "username",
            "labels" : "Username",
            "placeholder" : "Input Username",
            "icons" : faUser
        },
        {
            "name" : "email",
            "labels" : "Email", 
            "placeholder" : "Input Email",
            "icons" : faEnvelope
        }
    ];

    const handleDelete = async (data) => {
        let id = data.target.dataset.id
        console.log(id)
        // Lakukan operasi penghapusan data berdasarkan id
        // Misalnya, kirim permintaan ke server untuk menghapus data
        // Setelah berhasil, refresh data pada tabel
        try {
            // Kirim permintaan penghapusan data ke API menggunakan axios
            await axios.delete(`/api/delete-data/${id}`);
        
            // Setelah penghapusan berhasil, refresh data pada tabel
            refreshData();
        } catch (error) {
            console.error('Terjadi kesalahan saat menghapus data:', error);
            // Tangani kesalahan jika diperlukan
        }
    };
    const columnDefs = [
        { field: 'name'},
        { field: 'email'},
        {
            headerName: 'Actions',
            field: 'id',
            cellRenderer: DeleteButtonRenderer,
            cellRendererParams: {
                onClick: (params) => handleDelete(params),
            },
            minWidth: 100,
            sortable: false,
            editable: false,
            filter: false,
            resizable: false,
        },
    ];

    return (
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full grid grid-flow-row auto-rows-max">
            <div className="ag-theme-alpine" style={{ height: 400 }}>
                <div className="flex my-2">
                    <TeamComponentModel onClick={refreshData} data={data_input}/>
                </div>
                <div style={{ height: 'calc(100% - 40px)', width: '100%', overflow: 'hidden' }}>
                    <AgGridReact
                        ref={gridRef}
                        columnDefs={columnDefs}
                        frameworkComponents={{
                            deleteButtonRenderer: DeleteButtonRenderer,
                        }}
                        rowData={rowData}
                        defaultColDef={{
                            resizable: true,
                            sortable: true,
                            filter: true,
                            minWidth: 100,
                            editable: true,
                            flex: 1,
                            enableCellChangeFlash: true,
                        }}
                        animateRows={true}
                        overlayLoadingTemplate={'<div class="custom-loading-overlay"><span>Loading...</span></div>'}
                        overlayNoRowsTemplate={'<span aria-live="polite" aria-atomic="true";pos>Please wait...</span>'}
                        suppressColumnVirtualisation={true}
                        suppressLoadingOverlay={!isLoading}
                        loadingCellRendererParams={{
                            loadingMessage: "One moment please...",
                        }}
                        maxBlocksInCache={0}
                        pagination={true}
                        rowModelType="serverSide"
                        serverSideRowModel={true}
                        onStoreRefreshed={(event) => {
                            console.log("Refresh finished for store with route:", event.route);
                        }}
                        paginationPageSize={10}
                        onGridReady={onGridReady}
                        paginationPageSizeSelector={[10, 20, 30, 100]}
                        rowBuffer={0}
                        maxConcurrentDatasourceRequests={1}
                        blockLoadDebounceMillis={10}
                        showLoadingOverlay={isLoading}
                        onCellValueChanged={onCellValueChanged}
                        suppressServerSideFullWidthLoadingRow={true}
                        loadingOverlayComponent={() => (
                            <div className="ag-overlay-loading-center" style={{ backgroundColor: 'lightsteelblue', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Loading...</span>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}