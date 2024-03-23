import { useDateFun, stringToDate as q, type DateFunType, aAe as w, isEqualDay, isEqualYear, Zc } from "../../../utils/date-format";
import { formatDateToString as z } from "../format";

interface RangeDateOptions {
    title?: string;
    alias?: string;
    since: HumanizedDate | string | Date;
    until: HumanizedDate | string | Date;
    timeZone: string;
    comparisonOf?: string;
}

interface DateObject {
    year: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
}


interface QuantityUnit {
    quantity: number;
    unit: string;
}

interface DatePeriod {
    since: Date;
    until: Date;
    unit?: "ms" | "h" | "d";
    timeZone?: string;
}


interface QueryPeriod {
    since: string;
    until: string;
}
type QuarterType = 1 | 2 | 3 | 4;

var C = Object.defineProperty;
var b = (e: any, t: any, n: any) => t in e ? C(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : e[t] = n;
export var g = (e: any, t: any, n?: any) => (b(e, typeof t != "symbol" ? t + "" : t, n), n);


const Y = ["ms", "s", "m", "h", "d", "w", "m", "q", "y"]
    , Q = `^-?([0-9]+)([${Y.join("")}])$`;
function getHumanizedUnit(e: any): QuantityUnit | null {
    if (typeof e != "string")
        return null;
    if (e === "today")
        return {
            quantity: 0,
            unit: "d"
        };
    if (e === "yesterday")
        return {
            quantity: 1,
            unit: "d"
        };
    const t = new RegExp(Q).exec(e);
    if (t == null)
        return null;
    const [, n, s] = t;
    return {
        quantity: parseInt(n, 10),
        unit: s
    }
}
function getDateFromUTC({ year, month = 1, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0 }: DateObject) {
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second, millisecond))
}
function getAgoDateByUnit(e: Date, { quantity: t, unit: n }: QuantityUnit, s?: string) {
    switch (n) {
        case "d":
            return getAgoDay(e, t, s);
        case "w":
            return getAgoDay(e, t * 7, s);
        case "m":
            return getAgoMonth(e, t, s);
        case "q":
            return getAgoQuarter(e, t, s);
        case "y":
            return getAgoYear(e, t, s);
        default:
            throw new RangeError(`Unhandled relative time unit ${n}`)
    }
}
function p(e: number, t: number, n: number, s: number, a: number, i: number, o: number, r?: string) {
    const u = getDateFromUTC({
        year: e,
        month: t,
        day: n,
        hour: s,
        minute: a,
        second: i,
        millisecond: o
    });
    return w(u, r, "UTC")
}
function getAgoDay(e: Date, offset: number, timeZone?: string) {
    const { year: s, month: a, day: i, hour: o, minute: r, second: u } = useDateFun(e, timeZone);
    return p(s(), a(), i() - offset, o(), r(), u(), e.getUTCMilliseconds(), timeZone)
}
function getAgoMonth(e: Date, offset: number, timeZone?: string) {
    const { year: s, month: a, day: i, hour: o, minute: r, second: u } = useDateFun(e, timeZone)
        , c = p(s(), a() - offset, i(), o(), r(), u(), e.getUTCMilliseconds(), timeZone)
        , h = offset >= a() ? a() - offset + 12 : a() - offset
        , d = useDateFun(c, timeZone);
    return d.month() !== h ? p(d.year(), h + 1, 0, o(), r(), u(), e.getUTCMilliseconds(), timeZone) : c
}
function getAgoQuarter(e: Date, offset: number, timeZone?: string) {
    const { year: s, month: a, day: i, hour: o, minute: r, second: u } = useDateFun(e, timeZone);
    return p(s(), a() - offset * 3, i(), o(), r(), u(), e.getUTCMilliseconds(), timeZone)
}
function getAgoYear(e: Date, offset: number, timeZone?: string) {
    const { year: s, month: a, day: i, hour: o, minute: r, second: u } = useDateFun(e, timeZone)
        , c = p(s() - offset, a(), i(), o(), r(), u(), e.getUTCMilliseconds(), timeZone);
    return useDateFun(c, timeZone).month() !== a() ? p(s() - offset, a() + 1, 0, o(), r(), u(), e.getUTCMilliseconds(), timeZone) : c
}
function F(e: string) {
    const t = z(new Date, "YYYY-MM-DD", e);
    return new Date(`${t}T00:00:00`)
}
function stringToDate({ date: e, browserTimezone: t, shopTimezone: n }: { date: string, browserTimezone: string, shopTimezone: string }) {
    const s = q(e, t);
    if (s != null)
        return s;
    const a = getHumanizedUnit(e);
    if (a != null) {
        const i = F(n);
        return getAgoDateByUnit(i, a, t)
    }
    throw new Error(`Unable to parse date: ${e} for timezone: ${t}`)
}
function W(e: Date, t: string, n: string) {
    const { year: s, month: a, day: i, weekday: o } = useDateFun(e, n);
    let r;
    switch (t) {
        case "d":
            r = getDateFromUTC({
                year: s(),
                month: a(),
                day: i()
            });
            break;
        case "w":
            r = getDateFromUTC({
                year: s(),
                month: a(),
                day: i() - o()
            });
            break;
        case "m":
            r = getDateFromUTC({
                year: s(),
                month: a()
            });
            break;
        case "q":
            r = getDateFromUTC({
                year: s(),
                month: a() - (a() - 1) % 3
            });
            break;
        case "y":
            r = getDateFromUTC({
                year: s()
            });
            break;
        default:
            throw new RangeError(`Unhandled relative time unit ${t}`)
    }
    return w(r, n, "UTC")
}
function X(e: Date, t: string, n: string) {
    const { year: s, month: a, day: i, weekday: o } = useDateFun(e, n);
    let r;
    switch (t) {
        case "d":
            r = getOffsetUntilDate(s(), a(), i());
            break;
        case "w":
            r = getOffsetUntilDate(s(), a(), i() - o() + 6);
            break;
        case "m":
            r = getOffsetUntilDateByMonth(s(), a());
            break;
        case "q":
            r = getOffsetUntilDateByQuarter(s(), a());
            break;
        case "y":
            r = getOffsetUntilDateByYear(s());
            break;
        default:
            throw new RangeError(`Unhandled relative time unit ${t}`)
    }
    return w(r, n, "UTC")
}
function getOffsetUntilDate(e: number, t: number, n: number) {
    const s = getDateFromUTC({
        year: e,
        month: t,
        day: n + 1
    });
    return new Date(s.setMilliseconds(-1).valueOf())
}
function getOffsetUntilDateByMonth(e: number, t: number) {
    return getOffsetUntilDate(e, t + 1, 0)
}
function getOffsetUntilDateByQuarter(e: number, t: number) {
    const n = t - 1
        , a = t - n % 3 + 2;
    return getOffsetUntilDateByMonth(e, a)
}
function getOffsetUntilDateByYear(e: number) {
    return getOffsetUntilDateByMonth(e, 12)
}
const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone, V = {
    second: 1e3,
    minute: 6e4,
    hour: 36e5,
    day: 864e5,
    week: 6048e5,
    month: 2628e6,
    year: 3154e7
}, Z = [{
    minRange: 0,
    maxRange: 1,
    dimensions: ["hour"]
}, {
    minRange: 2,
    maxRange: 6,
    dimensions: ["hour", "day", "hour_of_day"]
}, {
    minRange: 7,
    maxRange: 13,
    dimensions: ["hour", "day", "week", "hour_of_day"]
}, {
    minRange: 14,
    maxRange: 27,
    dimensions: ["hour", "day", "week", "hour_of_day", "day_of_week"]
}, {
    minRange: 28,
    maxRange: 89,
    dimensions: ["hour", "day", "week", "month", "hour_of_day", "day_of_week"]
}, {
    minRange: 90,
    maxRange: 364,
    dimensions: ["day", "week", "month", "quarter", "hour_of_day", "day_of_week"]
}, {
    minRange: 365,
    maxRange: 729,
    dimensions: ["day", "week", "month", "quarter", "year", "hour_of_day", "day_of_week"]
}, {
    minRange: 730,
    maxRange: 1 / 0,
    dimensions: ["day", "week", "month", "quarter", "year", "hour_of_day", "day_of_week", "month_of_year"]
}], tt = ["hour", "day", "week", "month"], E = {
    day: "numeric",
    month: "short",
    year: "numeric"
}, et = {
    day: "numeric",
    month: "short"
};

class HumanizedDate {
    shopTimezone: string;
    value: Date;
    relativeDate: Date | string | null = null;
    relativeDateParts: QuantityUnit | null = null;
    parts: DateFunType;

    constructor(t: Date | string, timeZone: string, s?: string | null) {
        this.shopTimezone = timeZone;
        const a = getHumanizedUnit(t as string);
        typeof t == "string" && a != null && (this.relativeDate = t,
            this.relativeDateParts = a);
        const i = t instanceof Date ? t : stringToDate({
            date: t,
            browserTimezone,
            shopTimezone: this.shopTimezone
        });
        if (s == null)
            this.value = i;
        else {
            const { unit: o } = a ?? {
                unit: "d"
            }
                , r = s === "since" ? W(i, o, browserTimezone) : X(i, o, browserTimezone);
            this.value = r
        }
        this.parts = useDateFun(this.value, browserTimezone)
    }
    get year(): number {
        return this.parts.year()
    }
    get quarter() {
        const t = this.parts.month();
        return Math.ceil(t / 3) as QuarterType
    }
    get month() {
        return this.parts.month()
    }
    get weekday() {
        return this.parts.weekday()
    }
    get day() {
        return this.parts.day()
    }
    get hour() {
        return this.parts.hour()
    }
    get minute() {
        return this.parts.minute()
    }
    get second() {
        return this.parts.second()
    }
    toSqlString() {
        const t = String(this.value.getFullYear());
        let n = String(this.value.getMonth() + 1)
            , s = String(this.value.getDate());
        return n.length < 2 && (n = String(n).padStart(2, "0")),
            s.length < 2 && (s = String(s).padStart(2, "0")),
            [t, n, s].join("-")
    }
    toString() {
        return String(this.relativeDate ?? this.toSqlString())
    }
    getBrowserValueAtZeroTime() {
        const t = new Date(this.value);
        return t.setHours(0),
            t.setMinutes(0),
            t.setSeconds(0),
            t.setMilliseconds(0),
            t
    }
    getPrevious({ quantity: t, unit: n }: QuantityUnit) {
        const s = getAgoDateByUnit(this.value, {
            quantity: t,
            unit: n
        }, browserTimezone);
        return new HumanizedDate(s, this.shopTimezone)
    }
    isToday() {
        if (this.relativeDate == null) {
            const t = new HumanizedDate("today", this.shopTimezone);
            return this.toSqlString() === t.toSqlString()
        }
        return ["today", "-0d", "0d"].includes(String(this.relativeDate))
    }
}
function _({ since: e, until: t, unit: n }: DatePeriod) {
    const s = t.valueOf() - e.valueOf() + 1
        , a = s / 1e3 / 60 / 60
        , i = Math.round(a / 24);
    switch (n) {
        case "ms":
            return s;
        case "h":
            return a;
        case "d":
            return i;
        default:
            throw new RangeError(`Unhandled TimeUnit: ${n}`)
    }
}
const nt = 93
    , st = 72;
function at({ since: e, until: t }: DatePeriod) {
    const n = _({
        since: e,
        until: t,
        unit: "d"
    })
        , s = _({
            since: e,
            until: t,
            unit: "h"
        });
    return n > nt ? "month" : s > st ? "day" : "hour"
}
function it({ since: e, until: t }: DatePeriod) {
    const n = _({
        since: e,
        until: t,
        unit: "ms"
    })
        , s = Math.round(n / V.day)
        , a = Z.find(i => s >= i.minRange && s <= i.maxRange);
    return a == null ? tt : a.dimensions
}
function rt({ since: e, until: t }: DatePeriod, n?: any, s?: string) {

    const formatDate = n?.formatDate || Zc;
    const translate = n?.translate || ((type: string, o: {
        startDate: string;
        endDate: string;
    }) => {
        return `${o.startDate} - ${o.endDate}`;
    });


    let a = formatDate(e, {
        timeZone: s,
        ...E
    });
    const i = formatDate(t, {
        timeZone: s,
        ...E
    });
    return isEqualDay(e, t, s) ? a : (isEqualYear(e, t, s) && (a = formatDate(e, {
        timeZone: s,
        ...et
    })), translate("date.range", {
        startDate: a,
        endDate: i
    }))
}
function ot({ since: e, until: t, timeZone: n }: DatePeriod) {
    const s = _({
        since: e,
        until: t,
        unit: "d"
    })
        , a = getAgoDateByUnit(e, {
            quantity: s,
            unit: "d"
        }, n)
        , i = getAgoDateByUnit(t, {
            quantity: s,
            unit: "d"
        }, n);
    return {
        since: a,
        until: i
    }
}
function ut({ since: e, until: t, timeZone: n }: DatePeriod) {
    return {
        since: getAgoDateByUnit(e, {
            quantity: 1,
            unit: "y"
        }, n),
        until: getAgoDateByUnit(t, {
            quantity: 1,
            unit: "y"
        }, n)
    }
}

export interface RangeDateType {
    title?: string;
    alias: string;
    since: HumanizedDate;
    until: HumanizedDate;
    timeZone: string;
    comparisonOf?: string;
    getTimeDimensions: () => string[];
    getBestTimeDimension: () => "hour" | "day" | "month";
    toHumanizedString: (e: any) => any;
    isEqual: (e: RangeDateType) => boolean;
    getComparisonRange: (e: any) => RangeDateType;
    clampUntil: (e: any) => RangeDateType;
    serialize: () => string;
    isToday: () => boolean;
    toDatePeriod: () => DatePeriod;
    toQueryPeriod: () => QueryPeriod;
    getCompareToIdentifier: () => string;
}
const ct = ["today", "yesterday", "previousPeriod", "previousYear"];
const rangeDateFunction: any = {
    getTimeDimensions() {
        return it({
            since: this.since.value,
            until: this.until.value
        })
    },
    getBestTimeDimension() {
        return at({
            since: this.since.value,
            until: this.until.value
        })
    },
    toHumanizedString(e?: any) {
        return rt({
            since: this.since.value,
            until: this.until.value
        }, e, browserTimezone)
    },
    isEqual(e: RangeDateType) {
        return isEqualDay(this.since.value, e.since.value) && isEqualDay(this.until.value, e.until.value)
    },
    getComparisonRange(e: { type: string; title: string; }) {
        const { type: t, title: n } = e
            , s = {
                title: n,
                timeZone: this.timeZone,
                alias: t,
                comparisonOf: this.alias === "custom" ? void 0 : this.alias
            };
        if (this.since.isToday() && this.until.isToday() && t === "previousPeriod")
            return rangeDate({
                ...s,
                since: "yesterday",
                until: "yesterday"
            });
        const a = this.until.relativeDate !== "today" && this.until.relativeDateParts !== null && this.since.relativeDateParts !== null && this.since.relativeDateParts.unit !== "d" && this.since.relativeDateParts.unit === this.until.relativeDateParts.unit && this.since.relativeDateParts.quantity < 12;
        if (t === "previousPeriod" && a) {
            const { quantity: c, unit: h } = this.since.relativeDateParts!
                , { quantity: d, unit: R } = this.until.relativeDateParts!;
            return rangeDate({
                since: `-${c + 1}${h}`,
                until: `-${d + 1}${R}`,
                ...s
            })
        }
        const i = this.until.relativeDate === "today" && this.since.relativeDateParts !== null && this.since.relativeDateParts.unit !== "d" && this.since.relativeDateParts.quantity === 0;
        if (t === "previousPeriod" && i) {
            const { quantity: c, unit: h } = this.since.relativeDateParts!
                , d = c + 1
                , R = this.since.getPrevious({
                    quantity: d,
                    unit: h
                })
                , k = this.until.getPrevious({
                    quantity: d,
                    unit: h
                });
            return rangeDate({
                since: R,
                until: k,
                ...s
            })
        }
        const o = {
            since: this.since.value,
            until: this.until.value,
            timeZone: browserTimezone
        }
            , { since: r, until: u } = t === "previousPeriod" ? ot(o) : ut(o);
        return rangeDate({
            ...s,
            since: r,
            until: u
        })
    },
    clampUntil(e: Date) {
        return this.until.value <= e ? this : rangeDate({
            title: this.title,
            alias: this.alias,
            timeZone: this.timeZone,
            comparisonOf: this.comparisonOf,
            since: this.since.value,
            until: e
        })
    },
    serialize() {
        const { since: e, until: t, alias: n, comparisonOf: s } = this;
        return JSON.stringify({
            since: e.toString(),
            until: t.toString(),
            alias: n,
            comparisonOf: s
        })
    },
    isToday() {
        return this.since.isToday() && this.until.isToday()
    },
    toDatePeriod() {
        return {
            since: this.since.value,
            until: this.until.value
        }
    },
    toQueryPeriod() {
        return {
            since: this.since.toString(),
            until: this.until.toString()
        }
    },
    getCompareToIdentifier() {
        const { alias: e, since: t } = this;
        return e.startsWith("bfcm") || ct.includes(e) ? e : t.toString()
    }
};


function rangeDate({ since: e, until: t, timeZone: n, title: s, alias: a, comparisonOf: i }: RangeDateOptions): RangeDateType {
    const o = {
        since: e instanceof HumanizedDate ? e : new HumanizedDate(e, n, "since"),
        until: t instanceof HumanizedDate ? t : new HumanizedDate(t, n, "until"),
        timeZone: n,
        title: s ?? null,
        alias: a ?? "custom",
        comparisonOf: i ?? null
    };
    return Object.assign(Object.create(rangeDateFunction), o)
}
function rangeStringDate(e: string, timeZone: string) {
    try {
        const { since: n, until: s, alias: a, comparisonOf: i } = JSON.parse(e);
        return rangeDate({
            since: n,
            until: s,
            timeZone,
            alias: a,
            comparisonOf: i
        })
    } catch {
        return null
    }
}
function isRangeDateType(e: any) {
    return Object.getPrototypeOf(e) === rangeDateFunction
}
export const lt = "_Message_1vu2x_1"
    , ht = {
        Message: lt
    }
    , dt = {
        noResults: "There was no data found for this date range",
        noResultsCompact: "No data available"
    }
    , yt = {
        MetricCardEmpty: dt
    }
    , mt = {
        noResults: "找不到此日期范围的数据",
        noResultsCompact: "没有可用数据"
    }
    , ft = {
        MetricCardEmpty: mt
    }
    , gt = {
        [Symbol.for("i18n-id")]: "MetricCardEmpty_1cea64g",
        en: yt,
        "zh-CN": ft
    };

export { browserTimezone, rangeDate, rangeStringDate, HumanizedDate, isRangeDateType };