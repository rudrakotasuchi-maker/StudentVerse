// Dedicated Coding Practice Challenges & Exercises for StudentVerse
// Categorized by Language, Topic, and Difficulty (Beginner -> Intermediate -> Advanced)
// Includes Problem Statements, Sample I/O, Hints, Explanations, Solutions, and Reputable External Links

const codingExercises = [
  // ==========================================
  // 1. JAVA EXERCISES
  // ==========================================
  {
    id: 'java-1',
    title: 'Two Sum & Target Lookup',
    language: 'Java',
    topic: 'Arrays & Hash Maps',
    difficulty: 'Beginner',
    problem_statement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    sample_input: 'nums = [2, 7, 11, 15], target = 9',
    sample_output: '[0, 1] (because nums[0] + nums[1] == 9)',
    hints: [
      'A brute force O(n^2) approach checks all pairs. Can you do it in a single pass O(n)?',
      'Use a HashMap<Integer, Integer> to store each number and its index as you iterate.',
      'For each number x, check if (target - x) already exists in the map.'
    ],
    explanation: 'By storing the complement (target - nums[i]) in a HashMap, we can look up whether the matching partner was already seen in O(1) time. This reduces the time complexity from O(n^2) to O(n) with O(n) space.',
    solution_code: `import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}`,
    external_platform: 'LeetCode',
    external_url: 'https://leetcode.com/problems/two-sum/'
  },
  {
    id: 'java-2',
    title: 'Reverse a Singly Linked List',
    language: 'Java',
    topic: 'Linked Lists & Pointers',
    difficulty: 'Beginner',
    problem_statement: 'Given the head of a singly linked list, reverse the list, and return the reversed list head.',
    sample_input: 'head = [1, 2, 3, 4, 5]',
    sample_output: '[5, 4, 3, 2, 1]',
    hints: [
      'Maintain three pointers: prev, curr, and next.',
      'Before updating curr.next to point to prev, remember to save the next node!',
      'When curr reaches null, prev will be the new head of the reversed list.'
    ],
    explanation: 'Iterate through the linked list. For each node, store its original next node, point its next to the previous node (initially null), and advance both previous and current pointers.',
    solution_code: `public class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next; // save next
            curr.next = prev;             // reverse pointer
            prev = curr;                  // advance prev
            curr = nextTemp;              // advance curr
        }
        return prev;
    }
}`,
    external_platform: 'GeeksforGeeks',
    external_url: 'https://www.geeksforgeeks.org/reverse-a-linked-list/'
  },
  {
    id: 'java-3',
    title: 'Valid Parentheses & Bracket Matching',
    language: 'Java',
    topic: 'Stacks & Strings',
    difficulty: 'Beginner',
    problem_statement: 'Given a string `s` containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. Brackets must close in the correct order and every open bracket must have a corresponding close bracket of the same type.',
    sample_input: 's = "()[]{}"',
    sample_output: 'true (s = "(]" returns false)',
    hints: [
      'Use a Stack to push opening brackets.',
      'When you encounter a closing bracket, check if the stack is non-empty and the top matches the corresponding open bracket.',
      'After the loop, the stack must be completely empty for the string to be valid.'
    ],
    explanation: 'A stack guarantees Last-In-First-Out (LIFO) matching. Every time a closing bracket appears, it must pair with the most recently opened bracket.',
    solution_code: `import java.util.Stack;

public class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`,
    external_platform: 'LeetCode',
    external_url: 'https://leetcode.com/problems/valid-parentheses/'
  },
  {
    id: 'java-4',
    title: 'LRU (Least Recently Used) Cache Design',
    language: 'Java',
    topic: 'Object-Oriented Design & System Data Structures',
    difficulty: 'Advanced',
    problem_statement: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) operations in O(1) average time complexity.',
    sample_input: 'LRUCache(2); put(1, 1); put(2, 2); get(1); put(3, 3); // evicts key 2',
    sample_output: 'get(2) returns -1 (not found)',
    hints: [
      'A HashMap gives O(1) key lookups, but does not maintain ordered access.',
      'A Doubly Linked List allows O(1) removal and insertion of nodes at head and tail.',
      'Combine a HashMap<Integer, Node> with a custom Doubly Linked List with dummy head and tail nodes.'
    ],
    explanation: 'When a key is read or updated, move its node to the head of the doubly linked list. When capacity is exceeded during a put operation, remove the node at the tail (the least recently used item).',
    solution_code: `import java.util.HashMap;
import java.util.Map;

public class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    
    private Map<Integer, Node> map = new HashMap<>();
    private int capacity;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insertAtHead(node);
        return node.val;
    }
    
    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            map.remove(tail.prev.key);
            remove(tail.prev);
        }
        Node newNode = new Node(key, value);
        insertAtHead(newNode);
        map.put(key, newNode);
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insertAtHead(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`,
    external_platform: 'LeetCode',
    external_url: 'https://leetcode.com/problems/lru-cache/'
  },

  // ==========================================
  // 2. PYTHON EXERCISES
  // ==========================================
  {
    id: 'py-1',
    title: 'Palindrome String & Two-Pointer Verification',
    language: 'Python',
    topic: 'Strings & Two Pointers',
    difficulty: 'Beginner',
    problem_statement: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.',
    sample_input: 's = "A man, a plan, a canal: Panama"',
    sample_output: 'True ("amanaplanacanalpanama" is a palindrome)',
    hints: [
      'You can filter the string using c.isalnum() and c.lower().',
      'Alternatively, use two pointers from left and right moving towards the center with O(1) extra space.'
    ],
    explanation: 'Using two pointers (left starting at 0, right starting at len(s)-1), skip non-alphanumeric characters and compare lowercase characters. If any mismatch occurs, it is not a palindrome.',
    solution_code: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

# Test
print(is_palindrome("A man, a plan, a canal: Panama")) # True`,
    external_platform: 'HackerRank',
    external_url: 'https://www.hackerrank.com/challenges/python-strings/problem'
  },
  {
    id: 'py-2',
    title: 'Anagram Grouping with Dictionaries',
    language: 'Python',
    topic: 'Hash Maps & Dictionaries',
    difficulty: 'Intermediate',
    problem_statement: 'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase.',
    sample_input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
    sample_output: '[["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]',
    hints: [
      'Sorted anagrams have the identical sequence of letters (e.g. sorted("eat") == sorted("tea") == ["a", "e", "t"]).',
      'Use a dictionary (or collections.defaultdict(list)) with the sorted tuple as the key.'
    ],
    explanation: 'Using sorted letters as a hashable tuple key, all anagrams hash to the identical bucket in O(N * K log K) time, where N is word count and K is max string length.',
    solution_code: `from collections import defaultdict
from typing import List

def group_anagrams(strs: List[str]) -> List[List[str]]:
    anagram_map = defaultdict(list)
    for word in strs:
        key = tuple(sorted(word))
        anagram_map[key].append(word)
    return list(anagram_map.values())

# Test
print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))`,
    external_platform: 'LeetCode',
    external_url: 'https://leetcode.com/problems/group-anagrams/'
  },
  {
    id: 'py-3',
    title: 'Binary Search in a Sorted Array',
    language: 'Python',
    topic: 'Searching & Divide and Conquer',
    difficulty: 'Beginner',
    problem_statement: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.',
    sample_input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
    sample_output: '4 (nums[4] == 9)',
    hints: [
      'Divide the search interval in half at each iteration.',
      'mid = left + (right - left) // 2 prevents potential integer overflow in languages with fixed int sizes.',
      'If nums[mid] == target, return mid; if nums[mid] < target, search right half; else search left half.'
    ],
    explanation: 'Binary search halves the search space at each step, yielding logarithmic time O(log n) compared to linear search O(n).',
    solution_code: `def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Test
print(search([-1, 0, 3, 5, 9, 12], 9)) # Output: 4`,
    external_platform: 'GeeksforGeeks',
    external_url: 'https://www.geeksforgeeks.org/binary-search/'
  },

  // ==========================================
  // 3. C / C++ EXERCISES
  // ==========================================
  {
    id: 'c-1',
    title: 'Pointers & In-Place Array Reversal in C',
    language: 'C / C++',
    topic: 'Pointers & Memory Manipulation',
    difficulty: 'Beginner',
    problem_statement: 'Write a C function `void reverse_array(int *arr, int size)` that reverses an array in-place without allocating auxiliary memory, using two pointer dereferences.',
    sample_input: 'arr = {10, 20, 30, 40, 50}, size = 5',
    sample_output: '{50, 40, 30, 20, 10}',
    hints: [
      'Point ptr_start to arr, and ptr_end to arr + size - 1.',
      'Swap *ptr_start and *ptr_end using a temporary variable while ptr_start < ptr_end.',
      'Increment ptr_start and decrement ptr_end in each step.'
    ],
    explanation: 'Pointer arithmetic allows direct manipulation of contiguous memory addresses in C without index lookup overhead.',
    solution_code: `#include <stdio.h>

void reverse_array(int *arr, int size) {
    int *start = arr;
    int *end = arr + size - 1;
    while (start < end) {
        int temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

int main() {
    int data[] = {10, 20, 30, 40, 50};
    reverse_array(data, 5);
    for (int i = 0; i < 5; i++) {
        printf("%d ", data[i]);
    }
    return 0; // Prints: 50 40 30 20 10
}`,
    external_platform: 'HackerRank',
    external_url: 'https://www.hackerrank.com/domains/c'
  },
  {
    id: 'c-2',
    title: 'Cycle Detection in Singly Linked List (Floyd\'s Algorithm)',
    language: 'C / C++',
    topic: 'Linked Lists & Two Pointers',
    difficulty: 'Intermediate',
    problem_statement: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. Implement Floyd\'s Tortoise and Hare algorithm in C with O(1) memory.',
    sample_input: 'Linked list: 3 -> 2 -> 0 -> -4 -> (points back to node 2)',
    sample_output: 'true (cycle detected)',
    hints: [
      'Initialize slow and fast pointers to head.',
      'Advance slow by 1 step, fast by 2 steps.',
      'If fast or fast->next becomes NULL, no cycle exists. If slow == fast, a cycle is present.'
    ],
    explanation: 'If a cycle exists, the fast pointer will eventually lap the slow pointer inside the loop. The relative distance decreases by 1 in each step, guaranteeing detection in O(n) time.',
    solution_code: `#include <stdbool.h>
#include <stddef.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

bool hasCycle(struct ListNode *head) {
    if (head == NULL || head->next == NULL) return false;
    struct ListNode *slow = head;
    struct ListNode *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            return true;
        }
    }
    return false;
}`,
    external_platform: 'LeetCode',
    external_url: 'https://leetcode.com/problems/linked-list-cycle/'
  },

  // ==========================================
  // 4. JAVASCRIPT EXERCISES
  // ==========================================
  {
    id: 'js-1',
    title: 'Debounce Utility Function Implementation',
    language: 'JavaScript',
    topic: 'Closures & Asynchronous Event Timing',
    difficulty: 'Intermediate',
    problem_statement: 'Implement a `debounce(fn, delay)` utility in JavaScript. The debounce function ensures that `fn` will only be executed after `delay` milliseconds have elapsed since the last time the debounced function was invoked.',
    sample_input: 'User types "search" quickly in an input field: 5 keystrokes in 200ms with debounce(fetchResults, 300)',
    sample_output: 'fetchResults is called exactly ONCE, 300ms after the final keystroke.',
    hints: [
      'Return a wrapper function that uses a closure variable `timeoutId`.',
      'Whenever the wrapper is called, call `clearTimeout(timeoutId)` first.',
      'Set a new `setTimeout` to call `fn.apply(this, args)` after `delay` ms.'
    ],
    explanation: 'Debouncing cancels pending executions on repeated triggers. This is essential in frontend development for search input auto-complete, window resizing, and scroll handlers.',
    solution_code: `function debounce(func, delay) {
  let timerId = null;

  return function (...args) {
    const context = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// Example Usage:
const handleSearch = debounce((query) => {
  console.log("Fetching API results for:", query);
}, 300);`,
    external_platform: 'freeCodeCamp',
    external_url: 'https://www.freecodecamp.org/news/javascript-debounce-example/'
  },
  {
    id: 'js-2',
    title: 'Array Flattening with Recursion or Reduce',
    language: 'JavaScript',
    topic: 'Functional Programming & Recursion',
    difficulty: 'Beginner',
    problem_statement: 'Write a JavaScript function `flattenArray(arr)` that takes a deeply nested array of arbitrary depth and returns a flat one-dimensional array, without using the native Array.prototype.flat().',
    sample_input: 'arr = [1, [2, [3, [4, 5]], 6], 7]',
    sample_output: '[1, 2, 3, 4, 5, 6, 7]',
    hints: [
      'Check if each item is an array using Array.isArray(item).',
      'If it is an array, recursively call flattenArray on it and spread into the result.',
      'Alternatively, use Array.prototype.reduce().'
    ],
    explanation: 'Recursive array traversal inspects each element. If the element is an array, it unpacks sub-elements recursively until primitive values are reached.',
    solution_code: `function flattenArray(arr) {
  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      return acc.concat(flattenArray(item));
    }
    return acc.concat(item);
  }, []);
}

// Test
console.log(flattenArray([1, [2, [3, [4, 5]], 6], 7]));
// Output: [1, 2, 3, 4, 5, 6, 7]`,
    external_platform: 'GeeksforGeeks',
    external_url: 'https://www.geeksforgeeks.org/flatten-a-nested-array-in-javascript/'
  },

  // ==========================================
  // 5. SQL EXERCISES
  // ==========================================
  {
    id: 'sql-1',
    title: 'Second Highest Salary in Employees Table',
    language: 'SQL',
    topic: 'Subqueries & Limit Offset',
    difficulty: 'Beginner',
    problem_statement: 'Write an SQL query to report the second highest distinct salary from the `Employee` table. If there is no second highest salary, the query should report `NULL`.',
    sample_input: 'Employee table: id: [1, 2, 3], salary: [100, 200, 300]',
    sample_output: 'SecondHighestSalary: 200',
    hints: [
      'To handle duplicate salaries, use `DISTINCT salary`.',
      'You can select the MAX salary that is strictly less than the overall MAX salary.',
      'Alternatively, use `ORDER BY salary DESC LIMIT 1 OFFSET 1` wrapped in an outer SELECT so it evaluates to NULL if 2nd row does not exist.'
    ],
    explanation: 'Using `SELECT MAX(salary) WHERE salary < (SELECT MAX(salary) FROM Employee)` is portable and automatically returns NULL if only 1 distinct salary exists.',
    solution_code: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (
    SELECT MAX(salary)
    FROM Employee
);`,
    external_platform: 'LeetCode',
    external_url: 'https://leetcode.com/problems/second-highest-salary/'
  },
  {
    id: 'sql-2',
    title: 'Department Highest Salary with INNER JOIN',
    language: 'SQL',
    topic: 'Joins & Group By Aggregations',
    difficulty: 'Intermediate',
    problem_statement: 'Write an SQL query to find employees who have the highest salary in each of the departments. Join the `Employee` table with the `Department` table.',
    sample_input: 'Employee (id, name, salary, departmentId), Department (id, name)',
    sample_output: 'Department | Employee | Salary',
    hints: [
      'First group by departmentId to find MAX(salary) for each department.',
      'Then join that result back to Employee on departmentId and salary = max_salary.',
      'Join with Department to get the department name.'
    ],
    explanation: 'A correlated subquery or an inner join with a group-by subquery filters each row by the pre-computed maximum salary per department.',
    solution_code: `SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (e.departmentId, e.salary) IN (
    SELECT departmentId, MAX(salary)
    FROM Employee
    GROUP BY departmentId
);`,
    external_platform: 'LeetCode',
    external_url: 'https://leetcode.com/problems/department-highest-salary/'
  },

  // ==========================================
  // 6. WEB DEVELOPMENT & REACT TASKS
  // ==========================================
  {
    id: 'web-1',
    title: 'Interactive Filterable Product List with Search',
    language: 'Web & React',
    topic: 'React Hooks (useState, useMemo) & Input Handling',
    difficulty: 'Beginner',
    problem_statement: 'Create a React component that displays a list of items, includes a live search text input, category filter buttons, and displays a friendly empty state message when no items match.',
    sample_input: 'User types "lap" in search input with category "Electronics"',
    sample_output: 'Renders only matching products like "Laptop Stand", "Gaming Laptop"',
    hints: [
      'Maintain search query and selected category in `useState`.',
      'Use `useMemo` to filter products based on both search term and category.',
      'Use semantic HTML input and buttons.'
    ],
    explanation: 'Derived state computed via `useMemo` prevents unnecessary re-computations on unrelated renders and avoids desynchronized state bugs.',
    solution_code: `import React, { useState, useMemo } from 'react';

export default function ProductFilter({ products }) {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(query.toLowerCase());
      const matchCat = selectedCat === 'All' || p.category === selectedCat;
      return matchSearch && matchCat;
    });
  }, [products, query, selectedCat]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p>No products match your search criteria.</p>
      ) : (
        <ul>
          {filtered.map(item => (
            <li key={item.id}>{item.name} - \${item.price}</li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    external_platform: 'React Official Docs',
    external_url: 'https://react.dev/learn'
  },
  {
    id: 'web-2',
    title: 'Custom `useFetch` Hook with Loading, Error & AbortController',
    language: 'Web & React',
    topic: 'Custom React Hooks & Async API Lifecycle',
    difficulty: 'Intermediate',
    problem_statement: 'Write a custom React hook `useFetch(url)` that handles HTTP requests, provides `data`, `isLoading`, and `error` states, and properly cleans up by aborting in-flight requests if the component unmounts.',
    sample_input: 'const { data, isLoading, error } = useFetch("https://api.example.com/data");',
    sample_output: 'Gracefully switches between loading spinner, error message, and rendered data.',
    hints: [
      'Instantiate `const controller = new AbortController()` inside `useEffect`.',
      'Pass `{ signal: controller.signal }` to the fetch options.',
      'Return `() => controller.abort()` in the useEffect cleanup function.'
    ],
    explanation: 'Using `AbortController` in the cleanup function of `useEffect` cancels unneeded network calls and prevents React state updates on unmounted components ("memory leak" warning).',
    solution_code: `import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP error \${res.status}\`);
        return res.json();
      })
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}`,
    external_platform: 'MDN Web Docs',
    external_url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController'
  }
];

module.exports = codingExercises;
