import { useQuery, useMutation } from "@tanstack/react-query";
import {
    fetchTodos,
    createTodo,
    fetchTodoById,
    deleteTodo,
    updateTodo,
    fetchcompletedTodos,
} from "../api/Todos";
import { useQueryClient } from "@tanstack/react-query";

//cutsom hook to get all todos
export const useGetTodos = () => {
    // const {isAuthenticated, accessToken} = useAuthContext();
    const {
        data: Todos = [], //empty array as default value
        isLoading,
        error,
    } = useQuery({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
    });
    console.log(Todos);
    console.log(isLoading);
    console.log(error);
    return { Todos, isLoading, error };
};

//get completed todos
export const useCompletedTodos = () => {
    const {
        data: CompletedTodos = [], //empty array as default value
        isLoading,
        error,
    } = useQuery({
        queryKey: ["completedTodos"],
        queryFn: fetchcompletedTodos,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
    });
    console.log(CompletedTodos);
    console.log(isLoading);
    console.log(error);
    return { CompletedTodos, isLoading, error };
};

//get specific todo by id
export const usegetTodoById = (id) => {
    const {
        data: TodoById,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["todoById", id],
        queryFn: () => fetchTodoById(id),
        enabled: !!id,
        staleTime: 100 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 10, // 10 minutes
    });
    console.log(isLoading);
    console.log(error);
    console.log(TodoById);
    return { TodoById, isLoading, error };
};

//post new todo
export const useCreateNew = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTodo,
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            console.log("data sucessully", data);
        },
        onError: (error) => {
            console.error("error creating todo:", error);
        },
    });
    return mutation;
};

//deleted todo
export const useDelete = () => {
    const queryClient = useQueryClient();

    const mutationDel = useMutation({
        mutationFn: (id) => deleteTodo(id),
        onSuccess: async (data) => {
            console.log("Task deleted successfully", data);
            // Wait for the backend to confirm deletion, then refetch
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: (error) => {
            console.error("Failed to delete task", error);
        },
    });

    return mutationDel;
};

//update todo
export const useUpdate = () => {
    const queryClient = useQueryClient();
    const mutationUpdate = useMutation({
        mutationFn: ({ id, updatedData }) => updateTodo(id, updatedData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            console.log("updated sucessfulyy", data);
        },
        onError: (error) => {
            console.error("Failed to update task", error);
        },
    });
    return mutationUpdate;
};
