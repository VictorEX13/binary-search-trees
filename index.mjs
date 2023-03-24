import Tree from "./modules/tree.mjs";

function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
}

function logTreeData(tree) {
  console.log(`The tree is ${tree.isBalanced() ? "balanced." : "unbalanced!"}`);
  console.log("Level Order:", tree.levelOrder());
  console.log("Preorder:", tree.preorder());
  console.log("Inorder:", tree.inorder());
  console.log("Postorder:", tree.postorder());
}

const tree = new Tree(randomArray(10));

logTreeData(tree);

console.log("Adding new elements to the tree...");

for (let i = 101; i <= 110; i++) {
  tree.insert(i);
}

console.log(
  `The tree is now ${tree.isBalanced() ? "balanced." : "unbalanced!"}`
);

console.log("Rebalancing the tree...");

tree.rebalance();

logTreeData(tree);
