import { dayOfYear } from 'https://deno.land/std@0.91.0/datetime/mod.ts';

console.log(dayOfYear(new Date('2020-02-02')));
console.log(currentDayOfYear())

function currentDayOfYear(): number {
    return dayOfYear(new Date());
}