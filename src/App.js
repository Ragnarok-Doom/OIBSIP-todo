import { useEffect, useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import CompletedTaskList from './components/CompletedTaskList';
import PendingTaskList from './components/PendingTaskList';
import Cookies from 'js-cookie';
import ConfirmDialog from './components/ConfirmDialog';
import UpdateDialog from './components/UpdateDialog';
import BarChart from './components/chart/BarChart';
import PieChart from './components/chart/PieChart';
import LineChart from './components/chart/LineChart';
import { MdCardMembership, MdDashboard, MdMenu, MdPending, MdStackedLineChart, MdTask, MdTaskAlt } from 'react-icons/md';
import { IoBarChart, IoCard, IoClose, IoDocument, IoMoon, IoNotifications, IoPerson, IoPieChart, IoSunny } from 'react-icons/io5';

function App() {

    const [step, setStep] = useState(1)
    const [tasks, setTasks] = useState(() => {
    const tasksFromCookies = Cookies.get('tasks');
    return tasksFromCookies ? JSON.parse(tasksFromCookies) : [];
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const addTask = (task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    Cookies.set('tasks', JSON.stringify(newTasks), { expires: 7 });
  };

  const handleDelete = (taskIndex) => {
    setTaskToDelete(taskIndex);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete !== null) {
      const newTasks = tasks.filter((_, index) => index !== taskToDelete);
      setTasks(newTasks);
      Cookies.set('tasks', JSON.stringify(newTasks), { expires: 7 });
      setTaskToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  const handleUpdate = (taskIndex) => {
    setTaskToUpdate(taskIndex);
    setIsUpdateDialogOpen(true);
  };

  const updateTask = (updatedTask) => {
    if (taskToUpdate !== null) {
      const newTasks = tasks.map((task, index) =>
        index === taskToUpdate ? { ...task, ...updatedTask } : task
      );
      setTasks(newTasks);
      Cookies.set('tasks', JSON.stringify(newTasks), { expires: 7 });
      setTaskToUpdate(null);
      setIsUpdateDialogOpen(false);
    }
  };

  const cancelUpdate = () => {
    setTaskToUpdate(null);
    setIsUpdateDialogOpen(false);
  };

  const toggleCompletion = (taskIndex, completed) => {
    const newTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, completed } : task
    );
    setTasks(newTasks);
    Cookies.set('tasks', JSON.stringify(newTasks), { expires: 7 });
  };

  // Separate tasks into completed and pending
  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  useEffect(() => {
    console.log(tasks);
    Cookies.set('tasks', JSON.stringify(tasks), { expires: 7 });
  }, [tasks]);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

   const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

    //   Mobile Menubar
    const [menuCollapse, setMenuCollapse] = useState(false)

  return (
    <div className="App w-[100vw] h-[100vh] overflow-hidden bg-white dark:bg-gray-800 text-black dark:text-white relative ">
        <div className=' w-full h-full flex relative dark:bg-gray-800 dark:text-white '>
            {/* SIDEBAR */}
            <div className={` hidden md:block ${isCollapsed ? 'w-[70px]' : 'w-[350px]'} h-full bg-gray-50 flex flex-col gap-3 p-5 items-center relative transition-all duration-300 dark:bg-gray-800 dark:text-white overflow-y-scroll`}>
                <span><MdMenu className={`text-2xl absolute ${isCollapsed ? 'top-5 left-[50%] -translate-x-1/2' : 'right-3 top-3'} cursor-pointer`} onClick={toggleCollapse} /></span>
                <div className={` profile ${isCollapsed ? 'w-[20px] h-[20px] mt-10' : 'w-[100px] h-[100px]'} mt-10 relative rounded-full flex justify-center items-center bg-slate-200 mx-auto`}>
                    <IoPerson className={` ${isCollapsed ? 'text-xl' : ' text-6xl'}`} />
                </div>
                <h1 className={` ${isCollapsed && 'hidden'} font-bold text-lg font-sans mx-auto text-center mt-2`}>DASHBOARD</h1>

                <div className=' w-full mt-10 '>
                    <div className={`${!isCollapsed && 'ml-9'}`}>
                        <div className=''>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' 
                            onClick={() => setStep(1)}>
                            <MdDashboard className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Dashboard</span>
                            </h1>
                        </div>
                        <div className=' mt-5'>
                            <h2 className=' py-3 ml-[-5px]'>Form</h2>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' onClick={() => setStep(2)}><IoDocument className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Add Task</span></h1>
                        </div>
                        <div className=' mt-5'>
                            <h2 className=' py-3 ml-[-5px]'>Pages</h2>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' onClick={() => setStep(3)}>
                            <MdTask className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Task List</span></h1>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' onClick={() => setStep(4)}>
                            <IoCard className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Completed Tasks</span></h1>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' onClick={() => setStep(5)}><MdCardMembership className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Pending Tasks</span></h1>
                        </div>
                        <div className=' mt-5'>
                            <h2 className=' py-3 ml-[-5px]'>Chart</h2>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' onClick={() => setStep(6)}><IoBarChart className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Bar Chart</span></h1>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' onClick={() => setStep(7)}><IoPieChart className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Pie Chart</span></h1>
                            <h1 className=' w-full py-3 px-1 flex items-center gap-5 hover:text-blue-600 cursor-pointer' onClick={() => setStep(8)}><MdStackedLineChart className=' text-xl' /> <span className={` ${isCollapsed && 'hidden'}`}>Line Chart</span></h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* MAIN */}
            <div className=' w-full h-full overflow-y-scroll'>
                
                <div className=' w-full p-2 bg-gray-50 dark:bg-gray-700 dark:text-white'>
                    <p className=' flex gap-2 justify-between'>
                        <div>
                            <span className=' block md:hidden text-xl cursor-pointer hover:bg-gray-200 p-2 rounded-full dark:hover:text-gray-800' onClick={() => setMenuCollapse(!menuCollapse)}><MdMenu /></span>
                        </div>
                        <div className=' flex gap-1'>
                            <span className=' text-xl cursor-pointer hover:bg-gray-200 p-2 rounded-full dark:hover:text-gray-800' onClick={() => setDarkMode(!darkMode)}>{darkMode ? <IoSunny /> : <IoMoon />}</span>
                            <span className=' text-xl cursor-pointer hover:bg-gray-200 p-2 rounded-full dark:hover:text-gray-800'><IoNotifications /></span>
                            <span className=' text-xl cursor-pointer hover:bg-gray-200 p-2 rounded-full dark:hover:text-gray-800'><IoPerson /></span>
                        </div>
                    </p>
                </div>
                { step === 1 &&
                <>
                <div className=' w-full flex gap-10 p-5 flex-wrap'>
                    <div className=' flex-1 bg-slate-50 dark:bg-gray-700 p-5 rounded-2xl'>
                        <div className=' flex items-center justify-center gap-3'>
                            <IoPerson className=' text-6xl' />
                            <h1 className='  text-xl text-center'><span className=' '>Total Tasks</span><br />
                            {tasks.length}</h1>
                        </div>
                    </div>
                    <div className=' flex-1 bg-slate-50 dark:bg-gray-700 p-5 rounded-2xl'>
                        <div className=' flex items-center justify-center gap-3'>
                            <MdTaskAlt className=' text-6xl' />
                            <h1 className='  text-xl text-center'><span className=' '>Tasks Completed</span><br />{completedTasks.length}</h1>
                        </div>
                    </div>
                    <div className=' flex-1 bg-slate-50 dark:bg-gray-700 p-5 rounded-2xl'>
                        <div className=' flex items-center justify-center gap-3'>
                            <MdPending className=' text-6xl' />
                            <h1 className='  text-xl text-center'><span className=' '>Tasks Pending</span><br />{pendingTasks.length}</h1>
                        </div>
                    </div>
                </div>
                <div className=' w-full p-5'>
                    <div className=' w-full h-full lg:h-[400px] flex flex-wrap gap-5'>
                        <div className=' w-full lg:w-[400px]'>
                            <TaskInput addTask={addTask} />
                        </div>
                        <div className=' w-full flex-1 h-[500px] md:h-full bg-slate-50 rounded-[25px] dark:bg-gray-800 dark:shadow-[0] shadow-lg p-5 overflow-y-scroll'>
                            <TaskList tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} toggleCompletion=       {toggleCompletion} />
                        </div>
                    </div>
                    <h1 className=' p-5 text-5xl font-bold my-8'>Tasks</h1>
                    <div className=' w-full p-5'>
                        <div className=' w-full h-full lg:h-[400px] flex flex-wrap gap-5'>
                            <div className=' w-full lg:flex-1 h-full bg-slate-50 rounded-[25px] dark:bg-gray-800 dark:shadow-[0] shadow-lg p-5 overflow-y-scroll'>
                                <h1 className=' font-bold text-xl mb-5'>Pending Tasks</h1>
                                <PendingTaskList tasks={pendingTasks} handleDelete={handleDelete} handleUpdate={handleUpdate} toggleCompletion={toggleCompletion} />
                            </div>
                            <div className=' w-full lg:flex-1 h-full bg-slate-50 rounded-[25px] dark:bg-gray-800 dark:shadow-[0] shadow-lg p-5 overflow-y-scroll'>
                                <h1 className=' font-bold text-xl mb-5'>Completed Tasks</h1>
                                <CompletedTaskList tasks={completedTasks} handleDelete={handleDelete} handleUpdate={handleUpdate} toggleCompletion={toggleCompletion} />
                            </div>
                        </div>
                    </div>
                    <h1 className=' p-5 text-5xl font-bold my-8'>Charts</h1>
                    <div className=' w-full h-full flex flex-wrap lg:flex-nowrap  gap-5 overflow-hidden'>
                        <div className=' w-full flex flex-col gap-5'>
                            <BarChart tasks={tasks} />
                            <LineChart tasks={tasks} />
                        </div>
                        <div className=' w-full '>
                            <PieChart tasks={tasks} />
                        </div>
                    </div>
                </div>
                </>
                }
                { step === 2 &&
                    <>
                    <div className='w-full flex items-center h-[90%] justify-center'>
                        <div className=' w-full md:w-[500px] p-5'>
                            <h1 className='font-bold text-3xl my-5'>Add New Task</h1>
                            <TaskInput addTask={addTask} />
                        </div>
                    </div>
                    </>
                }
                { step === 3 &&
                    <>
                    <div className='w-full flex items-center h-[90%] justify-center'>
                        <div className=' w-[80%] relative flex flex-col justify-center'>
                            <div className=' md:mx-auto'>
                            <h1 className='font-bold text-3xl my-5'>Add New Task</h1>
                            <TaskList tasks={tasks} handleDelete={handleDelete} handleUpdate={handleUpdate} toggleCompletion=       {toggleCompletion} />
                            </div>
                        </div>
                    </div>
                    </>
                }
                { step === 4 &&
                    <>
                    <div className='w-full flex items-center h-[90%] justify-center'>
                        <div className=' w-[80%] md:w-[60%]'>
                            <h1 className='font-bold text-3xl my-5'>Tasks Completed</h1>
                            <CompletedTaskList tasks={completedTasks} handleDelete={handleDelete} handleUpdate={handleUpdate} toggleCompletion={toggleCompletion} />
                        </div>
                    </div>
                    </>
                }
                { step === 5 &&
                    <>
                    <div className='w-full flex items-center h-[90%] justify-center'>
                        <div className=' w-[80%] md:w-[60%]'>
                            <h1 className='font-bold text-3xl my-5'>Tasks Pending</h1>
                            <PendingTaskList tasks={pendingTasks} handleDelete={handleDelete} handleUpdate={handleUpdate} toggleCompletion={toggleCompletion} />
                        </div>
                    </div>
                    </>
                }
                { step === 6 &&
                    <>
                    <div className='w-full flex items-center h-[90%] justify-center'>
                        <div className=' md:w-[60%]'>
                            <BarChart tasks={tasks} />
                        </div>
                    </div>
                    </>
                }
                { step === 7 &&
                    <>
                    <div className='w-full flex items-center h-[90%] justify-center'>
                        <div className=' md:w-[40%]'>
                            <PieChart tasks={tasks} />
                        </div>
                    </div>
                    </>
                }
                { step === 8 &&
                    <>
                    <div className='w-full flex items-center h-[90%] justify-center'>
                        <div className=' md:w-[60%]'>
                            <LineChart tasks={tasks} />
                        </div>
                    </div>
                    </>
                }
            </div>
        </div>

        <>
        { menuCollapse && (
            <div className={`mbar dark:bg-gray-800 dark:border-r-[2px] top-0 ${menuCollapse ? 'left-0' : 'left-[100%]'} absolute w-[60vmin] h-full bg-slate-100`}>
                <div className=' flex justify-end'>
                    <span className=' m-4 text-xl'><IoClose onClick={() => setMenuCollapse(!menuCollapse)} /></span>
                </div>
                <div className='  flex flex-col gap-2'>
                    <h1 onClick={() => { setStep(1); setMenuCollapse(false); }} >Dashboard</h1>
                    <h1 onClick={() => { setStep(2); setMenuCollapse(false); }} >Task Form</h1>
                    <h1 onClick={() => { setStep(3); setMenuCollapse(false); }} >Task List</h1>
                    <h1 onClick={() => { setStep(4); setMenuCollapse(false); }} >Completed Task List</h1>
                    <h1 onClick={() => { setStep(5); setMenuCollapse(false); }} >Pending Task List</h1>
                    <h1 onClick={() => { setStep(6); setMenuCollapse(false); }} >Bar Chart</h1>
                    <h1 onClick={() => { setStep(7); setMenuCollapse(false); }} >Pie Chart</h1>
                    <h1 onClick={() => { setStep(8); setMenuCollapse(false); }} >Line Chart</h1>
                </div>
            </div>
        )}
        </>
        <ConfirmDialog 
            isOpen={isDeleteDialogOpen} 
            onConfirm={confirmDelete} 
            onCancel={cancelDelete} 
            taskTitle={tasks[taskToDelete]?.title || ''}
        />
        <UpdateDialog
            isOpen={isUpdateDialogOpen}
            onClose={cancelUpdate}
            onUpdate={updateTask}
            task={tasks[taskToUpdate] || {}}
        />  
    </div>
  );
}

export default App;
