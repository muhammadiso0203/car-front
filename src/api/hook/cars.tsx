import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

export const car = "car";

export const useCars = () => {
  const client = useQueryClient();

  const getCars = () => useQuery({
    queryKey: [car],
    queryFn: () => api.get("car").then(res => res.data),
  })

  const getCarById =(id: number) => useQuery({
    queryKey: [car],
    queryFn: () => api.get(`car/${id}`).then(res => res.data)
  })

  const createCar = useMutation({
    mutationFn: (data:any) => api.post("car", data),
    onSuccess: ()=> {
        client.invalidateQueries({queryKey: [car]})
    }
  })

  const deleteCar = useMutation({
    mutationFn: (id: number)=> api.delete(`car/${id}`),
    onSuccess: () => {
        client.invalidateQueries({queryKey: [car]})
    }
  })

  const updateCar = useMutation({
    mutationFn: ({id, data}: {id:number, data:any}) => api.patch(`car/${id}`, data),
    onSuccess: () => {
        client.invalidateQueries({queryKey: [car]})
    }
  })

  return {getCars, getCarById, createCar, updateCar, deleteCar}
};

