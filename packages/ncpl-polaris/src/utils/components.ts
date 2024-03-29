import { Fragment, h, Comment, type Component } from "vue";

const withEachWrapper = (nodes: any[], component: any) => {
  let innerNodes: any[] = [];
  for (let index in nodes) {
    let i = nodes[index];
    if (i.type == Fragment && i.children) {
      innerNodes.push(...withEachWrapper(i.children, component));
    } else {
      if (i.type && i.type.name == component.name) {
        innerNodes.push(h(i));
      } else if (i.type == Comment) {
        continue;
      } else {
        i && innerNodes.push(h(component, null, { default: () => i }));
      }
    }
  }
  return innerNodes;
};

export const hasWrapper = (nodes: any[], component: any): boolean => {
  for (let index in nodes) {
    let i = nodes[index];
    if (i.type == Fragment && i.children) {
      return hasWrapper(i.children, component);
    } else if (i.type && i.type.name == component.name) {
      return true;
    }
    break;
  }
  return false;
};

const withOutWrapper = (nodes: any[], component: any) => {
  return hasWrapper(nodes, component)
    ? nodes
    : h(component, null, { default: () => nodes });
};

// const withOutWrapperOnly = (nodes: any[], component: any) => {
//   return hasWrapper(nodes, component)
//     ? nodes
//     : h(component, null, { default: () => nodes });
// };

export const useWrapper = (children: any[], component: any, each = false) => {
  if (children.length > 0) {
    return each
      ? withEachWrapper(children, component)
      : withOutWrapper(children, component);
  }
  return [];
};

//getTransitionRawChildren
export const elementChildren = (nodes: any) => {
  let innerNodes: any[] = [];

  if (Array.isArray(nodes)) {
    for (let node of nodes) {
      if (node.type == Fragment && node.children) {
        innerNodes.push(...elementChildren(node.children as any));
      } else if (node.type != Comment) {
        innerNodes.push(node);
      }
    }
  }
  return innerNodes;
};

export const wrapWithComponent = (
  node: any,
  component: Component,
  props: any = null
) => {
  if (node.type?.name == component.name) {
    return h(node, props);
  }
  return h(component, props, { default: () => node });
};
