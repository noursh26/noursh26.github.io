/* Route helpers with no data attached, so pages that only link to projects
   don't pull the whole gallery into their bundle. */
export const projectHref = (id: string) => `/projects/${id}/`
