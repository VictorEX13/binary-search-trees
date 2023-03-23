import Node from "./node";

class Tree {
  #root;

  constructor(arr) {
    this.#root = this.#buildTree(arr);
  }

  #buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = Math.floor(arr.length / 2);
    const rootNode = new Node(arr[mid]);

    rootNode.left = this.#buildTree(arr.slice(0, mid));
    rootNode.right = this.#buildTree(arr.slice(mid + 1));

    return rootNode;
  }
}

export default Tree;
