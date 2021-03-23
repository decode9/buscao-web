export const normalizedArray = response => response ? response : []

export const normalized = response => response ? response : {}

export const actionObject = (type: string, payload = null) => ({ type, payload })

export const paginate = (items: Array<any>, page_number: number = 1, page_size: number = 15) => {
  return items.slice((page_number - 1) * page_size, page_number * page_size);
}

export const scrolling = (reference) => {
  if (reference) {
    const target = reference.current;
    window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  }
}

export const AMPM = (time: any) => {

  time = time.split(':');

  const hour = (hour) => (parseInt(hour) == 0) ? 12 : (parseInt(hour) < 12) ? hour : `0${parseInt(hour) - 12}`;
  const show = (hour) => (parseInt(hour) < 12) ? 'AM' : 'PM';

  return `${hour(time[0])}:${time[1]}${show(time[0])}`;
}
