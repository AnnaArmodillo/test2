import { InjectionKey } from 'vue';

export interface IFilters {
    searchFilters: Record<string, any>,
    setFilters: (param: string, value: any) => void
}
export const FiltersKey: InjectionKey<IFilters> = Symbol('Filters');