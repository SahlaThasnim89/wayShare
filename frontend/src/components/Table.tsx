// "use client"

// import * as React from "react"
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { PlusCircle, Search, UserRoundPen, UserRoundX, UserRoundCheck} from "lucide-react";
// import { UserRound } from "lucide-react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { selectUser } from "@/features/userSlice";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { toast } from "sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { useEffect, useState } from "react";


// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     email: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
// ]

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }



// export const columns: ColumnDef<User>[] = [
//   {
//     id: "slNo",
//     header: "Sl No",
//     cell: ({ row }) => row.index + 1, // Serial number
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "image",
//     header: "Image",
//     cell: ({ row }) => (
//       <img
//         src={row.getValue("image")}
//         alt="User"
//         className="w-10 h-10 rounded-full object-cover"
//       />
//     ),
//   },
//   {
//     accessorKey: "name",
//     header: "User Name",
//     cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
//   },
//   {
//     accessorKey: "email",
//     header: () => (
//       <Button
//         variant="ghost"
//         onClick={(e) => e.stopPropagation()} // Prevent sorting when clicking
//       >
//         Email
//         <ArrowUpDown className="ml-2 h-4 w-4" />
//       </Button>
//     ),
//     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "mobile",
//     header: "Mobile",
//     cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
//   },
//   {
//     accessorKey: "Actions",
//     header: "Actions",
//     cell: ({ row }) => <div>{row.getValue("Actions")}</div>,
//   },

// ]

// export function DataTableDemo({ users }) {

//   const [searchQuery, setSearchQuery] = useState("");
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [rowSelection, setRowSelection] = React.useState({})

//   const table = useReactTable({
//     data: users, // Use the fetched users here
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })

  // return (
  //   <div className="w-full">
  //     <div className="flex items-center py-4">
  //       <Input
  //         placeholder="Filter emails..."
  //         value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
  //         onChange={(event) =>
  //           table.getColumn("email")?.setFilterValue(event.target.value)
  //         }
  //         className="max-w-sm"
  //       />
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="outline" className="ml-auto">
  //             Columns <ChevronDown />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           {table
  //             .getAllColumns()
  //             .filter((column) => column.getCanHide())
  //             .map((column) => (
  //               <DropdownMenuCheckboxItem
  //                 key={column.id}
  //                 className="capitalize"
  //                 checked={column.getIsVisible()}
  //                 onCheckedChange={(value) => column.toggleVisibility(!!value)}
  //               >
  //                 {column.id}
  //               </DropdownMenuCheckboxItem>
  //             ))}
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     </div>

  //     <div className="rounded-md border">
  //       <Table>
  //         <TableHeader>
  //           {table.getHeaderGroups().map((headerGroup) => (
  //             <TableRow key={headerGroup.id}>
  //               {headerGroup.headers.map((header) => (
  //                 <TableHead key={header.id}>
  //                   {header.isPlaceholder
  //                     ? null
  //                     : flexRender(
  //                         header.column.columnDef.header,
  //                         header.getContext()
  //                       )}
  //                 </TableHead>
  //               ))}
  //             </TableRow>
  //           ))}
  //         </TableHeader>
  //         <TableBody>
  //           {table.getRowModel().rows?.length ? (
  //             table.getRowModel().rows.map((row) => (
  //               <TableRow
  //                 key={row.id}
  //                 data-state={row.getIsSelected() && "selected"}
  //               >
  //                 {row.getVisibleCells().map((cell) => (
  //                   <TableCell key={cell.id}>
  //                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //                   </TableCell>
  //                 ))}
  //               </TableRow>
  //             ))
  //           ) : (
  //             <TableRow>
  //               <TableCell colSpan={columns.length} className="h-24 text-center">
  //                 No results.
  //               </TableCell>
  //             </TableRow>
  //           )}
  //         </TableBody>
  //       </Table>
  //     </div>

  //     <div className="flex items-center justify-end space-x-2 py-4">
  //       <div className="flex-1 text-sm text-muted-foreground">
  //         {table.getFilteredSelectedRowModel().rows.length} of{" "}
  //         {table.getFilteredRowModel().rows.length} row(s) selected.
  //       </div>
  //       <div className="space-x-2">
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={() => table.previousPage()}
  //           disabled={!table.getCanPreviousPage()}
  //         >
  //           Previous
  //         </Button>
  //         <Button
  //           variant="outline"
  //           size="sm"
  //           onClick={() => table.nextPage()}
  //           disabled={!table.getCanNextPage()}
  //         >
  //           Next
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // )








//   <>
//       <div>
//       <div className="flex min-h-screen w-full flex-col bg-muted/40">
//         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//             <Breadcrumb className="hidden md:flex">
//               <BreadcrumbList>
//                 <BreadcrumbItem>
//                   <BreadcrumbLink asChild>
//                     <Link to="">Dashboard</Link>
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbLink asChild>
//                     <Link to="">Users</Link>
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//                 <BreadcrumbSeparator />
//                 <BreadcrumbItem>
//                   <BreadcrumbPage>All Users</BreadcrumbPage>
//                 </BreadcrumbItem>
//               </BreadcrumbList>
//             </Breadcrumb>
//             <div className="relative ml-auto flex-1 md:grow-0">
//               <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 type="search"
//                 placeholder="Search..."
//                 className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </header>
//           <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
//             <Tabs defaultValue="all">
//               <div className="flex items-center">
//                 <TabsList>
//                   <TabsTrigger value="all">All</TabsTrigger>
//                 </TabsList>
//                 <div className="ml-auto flex items-center gap-2">
//                   <Button
//                     size="sm"
//                     className="h-8 gap-1"
//                     // onClick={getCreatePage}
//                   >
//                     <PlusCircle className="h-3.5 w-3.5" />
//                     <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
//                       Add User
//                     </span>
//                   </Button>
//                 </div>
//               </div>
//               <TabsContent value="all">
//                 <Card x-chunk="dashboard-06-chunk-0">
//                   <CardHeader>
//                     <CardTitle>Users</CardTitle>
//                     <CardDescription>
//                       Manage your Users and view their Details.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead className="hidden w-[100px] sm:table-cell">
//                             Image
//                             <span className="sr-only">Image</span>
//                           </TableHead>
//                           <TableHead>Name</TableHead>
//                           <TableHead>email</TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Created at
//                           </TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Edit
//                           </TableHead>
//                           <TableHead className="hidden md:table-cell">
//                             Block
//                           </TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {FilterUser?.length > 0 ? (
//                           FilterUser?.map((user) => (
//                             <TableRow key={user._id}>
//                               <TableCell className="hidden sm:table-cell">
//                                 {user.image ? (
//                                   <img
//                                     alt="User image"
//                                     className="aspect-square rounded-md object-cover"
//                                     height="64"
//                                     src={user.image}
//                                     width="64"
//                                   />
//                                 ) : (
//                                   <Button
//                                     variant="secondary"
//                                     size="icon"
//                                     className="h-16 w-16 rounded-md flex items-center justify-center"
//                                   >
//                                     <UserRound className="h-8 w-8" />
//                                   </Button>
//                                 )}
//                               </TableCell>
//                               <TableCell className="font-medium">
//                                 {user.name}
//                               </TableCell>

//                               <TableCell className="hidden md:table-cell">
//                                 {user.email}
//                               </TableCell>

//                               <TableCell className="hidden md:table-cell">
//                                 {new Date(user.createdAt).toLocaleString(
//                                   "en-US",
//                                   {
//                                     year: "numeric",
//                                     month: "2-digit",
//                                     day: "2-digit",
//                                     hour: "2-digit",
//                                     minute: "2-digit",
//                                     hour12: true,
//                                   }
//                                 )}
//                               </TableCell>
//                               <TableCell>
//                                 <TooltipProvider>
//                                   <Tooltip>
//                                     <TooltipTrigger asChild>
//                                       <Button
//                                         variant="secondary"
//                                         size="icon"
//                                         className="rounded-full"
//                                         onClick={(e) =>
//                                           // getEditPage(e, user._id)
//                                         }
//                                       >
//                                         <UserRoundPen className="h-5 w-5" />
//                                       </Button>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p>edit user</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                 </TooltipProvider>
//                               </TableCell>

//                               <TableCell>
//                                 <TooltipProvider>
//                                   <Tooltip>
//                                     <TooltipTrigger asChild>
//                                       <AlertDialog>
//                                         <AlertDialogTrigger asChild>
//                                           <Button
//                                             variant="secondary"
//                                             size="icon"
//                                             className="rounded-full"
//                                           >
//                                             {user.isBlocked ? (
//                                               <UserRoundCheck className="h-5 w-5" />
//                                             ) : (
//                                               <UserRoundX className="h-5 w-5" />
//                                             )}

//                                           </Button>
//                                         </AlertDialogTrigger>
//                                         <AlertDialogContent>
//                                           <AlertDialogHeader>
//                                             <AlertDialogTitle>
//                                               Are you sure?
//                                             </AlertDialogTitle>
//                                             <AlertDialogDescription>
//                                             Please confirm: this action will affect their access. Do you want to proceed?
//                                             </AlertDialogDescription>
//                                           </AlertDialogHeader>
//                                           <AlertDialogFooter>
//                                             <AlertDialogCancel>
//                                               Cancel
//                                             </AlertDialogCancel>
//                                             <AlertDialogAction
//                                               onClick={(e) =>
//                                                 BlockUser(e, user._id,user.isBlocked)
//                                               }
//                                             >
//                                               Continue
//                                             </AlertDialogAction>
//                                           </AlertDialogFooter>
//                                         </AlertDialogContent>
//                                       </AlertDialog>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                     <p>{user.isBlocked ? "Unblock user" : "Block user"}</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                 </TooltipProvider>
//                               </TableCell>
//                             </TableRow>
//                           ))
//                         ) : (
//                           <TableRow>
//                             <TableCell colSpan={5} className="text-center">
//                               No users found
//                             </TableCell>
//                           </TableRow>
//                         )}
//                       </TableBody>
//                     </Table>
//                   </CardContent>
//                   <CardFooter>
//                     {/* <div className="text-xs text-muted-foreground">
//                     Showing <strong>1-10</strong> of <strong>32</strong>{" "}
//                     products
//                   </div> */}
//                   </CardFooter>
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </main>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

