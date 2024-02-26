import { unref } from 'vue';
import { defineStore } from 'pinia';
import api from '../request';

interface ProductType {
  id: string;
  content: any;
}


interface WebRequestType {
  method: 'get' | 'post';
  url: string;
  options?: {
    headers?: { [key: string]: string };
    body?: string;
  },
}

interface WebResponseType {
  status: string;
  body: string;
  headers: { [key: string]: string[] };
}

interface WebMapType {
  id: string;
  rule_id: string;
  next: WebClientType,
  source_id: string;
  next_id: string;
  additions?: { [key: string]: string },
}

interface UrlRuleType {
  id: string;
  type: string;
  content: {
    type: string;
    html_entity_decode?: boolean;
    no_repeat?: boolean;
    no_params?: boolean;
    no_text?: string[];
    replace_text?: { search: string[], replace: string[] };
    urls?: { url: string; args: string }[]
    range: {
      start: string;
      end?: string;
      args?: string[];
      arg?: string;
      node?: string;
    }
  },
  parent_id: string;
  task_id: string;
  maps?: WebMapType[];
}

interface WebClientType {
  id: string;
  request: WebRequestType;
  response?: WebResponseType;
  exception?: string;
  task_id: string;
  sended: 1 | 0;
}


const initWebData = () => {
  return {
    id: '',
    task_id: '0',
    request: {
      method: 'get',
      url: '',
    },
    sended: 0,
  } as WebClientType;
}

export const useCurrentTaskWeb = defineStore('currentTaskWeb', {
  state() {
    return {
      firstLoading: true,
      loading: false,
      productLoading: false,
      responseLoading: false,
      additionsLoading: false,
      map: {
        id: '',
        source_id: '',
        rule_id: '',
        next_id: '',
        additions: {},
      },
      data: initWebData(),
      prevRule: null as (UrlRuleType | null),
      rules: [] as UrlRuleType[],
      product: null as (ProductType | null | undefined),
    }
  },
  getters: {
    additions(state): { [key: string]: string } {
      return state.map.additions || {}
    },
    responseHeaders(state) {
      let data = [], index = 0;
      if (state.data.response && state.data.response.headers) {
        for (let key in state.data.response.headers) {
          for (let value of state.data.response.headers[key]) {
            data.push({
              id: `response_header_${index}`,
              key,
              value,
            })
            index++;
          }
        }
      }
      return data;
    },
    requestOptionsHeaders(state) {
      const _headers = state.data.request?.options?.headers ||
      {
        "Accept": "text\/html,application\/xhtml+xml,application\/xml;q=0.9,image\/avif,image\/webp,image\/apng,*\/*;q=0.8,application\/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
        "If-None-Match": "W\/\"1c8-fEirmDCs8TtsHqbbQ2lzyacFqVo\"",
        "Sec-Ch-Ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": "\"Windows\"",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/120.0.0.0 Safari\/537.36",
      };
      let headers = [];

      Object.keys(_headers).forEach((key, index) => {
        headers.push({
          id: `${index + 1}`,
          key: key,
          value: _headers[key],
        });
      });
      headers.push({
        id: `${headers.length + 1}`,
        key: '',
        value: '',
      })
      return headers;
    }
  },
  actions: {
    setRequestOptionsHeaders(headers: { key: string, value: string }[]) {
      if (typeof this.data.request.options == 'undefined' || Array.isArray(this.data.request.options)) {
        this.data.request.options = {}
      }
      let _header: { [key: string]: string } = {};
      for (let value of headers) {
        if (value.key) {
          _header[value.key] = value.value;
        }
      }
      this.data.request.options.headers = _header;
    },
    get(id: string) {
      this.data = initWebData();
      this.firstLoading = true;
      api.get(`/webs/${id}`).then(({ map, web, prev_rule, next_rules = [] }: any) => {
        if (web && prev_rule) {
          this.map = map;
          this.rules = next_rules
          this.data = web;
          this.prevRule = prev_rule;
          this.firstLoading = false;
        }
      })
    },
    getResponse() {
      this.responseLoading = true;
      api.get(`/webs/${this.map.id}/response`).then(({ web }: any) => {
        if (web) {
          this.data = web;
          this.responseLoading = false;
        }
      })
    },
    update() {
      const { request } = unref(this.data);
      this.loading = true;
      api.put(`/webs/${this.map.id}`, { request }).then((data: any) => {
        this.loading = false;
        if (data.id) {
          this.data = data;
        }
      })
    },
    updateResponse() {
      const { response } = unref(this.data);
      this.loading = true;
      api.put(`/webs/${this.map.id}`, { response }).then((data: any) => {
        this.loading = false;
        if (data.id) {
          this.data = data;
        }
      })
    },
    updateRuleType(type: string) {
      this.loading = true;
      api.put(`/webs/${this.map.id}`, { rule_type: type }).then((data: any) => {
        this.loading = false;
        if (data.id && this.prevRule) {
          this.prevRule.type = type;
        }
      })
    },
    getRuleByPosition(index: number) {
      return JSON.parse(JSON.stringify(this.rules[index]));
    },
    addRule(type: string, contentType: string = 'area') {
      this.rules.push({
        id: '',
        type,
        content: {
          type: contentType,
          range: {
            start: '', end: '',
          }
        },
        task_id: this.data.task_id,
        parent_id: this.prevRule?.id || '0',
      })
    },
    updateRule(index: number, rule: UrlRuleType) {
      const { id } = this.rules[index];
      const { maps, ...rest }: any = rule;
      rest.map_id = this.map.id;
      this.loading = true;
      return new Promise((resolve, reject) => {
        (id ? api.put(`/rules/${id}`, rest) : api.post(`/rules/`, rest)).then((data: any) => {
          if (data.id) {
            this.rules[index] = data;
            resolve(data);
          } else {
            reject('')
          }
        }).catch((error) => {
          reject(error)
        }).finally(() => {
          this.loading = false;
        })
      })
    },
    touchProduct() {
      this.productLoading = true;
      api.post(`/webs/${this.map.id}/product`).then((data: any) => {
        if (data.id) {
          this.product = data;
        }
      }).finally(() => {
        this.productLoading = false;
      })
    },
    touchAdditions() {
      this.additionsLoading = true;
      api.post(`/webs/${this.map.id}/additions`).then((data: any) => {
        if (data) {
          this.map.additions = data;
        }
      }).finally(() => {
        this.additionsLoading = false;
      })
    },
    deleteRule(index: number) {
      const { id } = this.rules[index];
      if (id) {
        this.loading = true;
        api.delete(`/rules/${id}`).then((data: any) => {
          this.rules.splice(index, 1);
          this.loading = false;
        })
      } else {
        this.rules.splice(index, 1);
      }
    }
  }
})


