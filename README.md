# Contains a sample flow on how to setup a Pulumi environment

It's meant o be run in the order of

1. index.ts
2. 8index_delete_protection.ts
   1. You're meant to try and "delete" by running up first
   2. Then uncomment, run up and "re-comment" and up again
3. 7index_stack_website.ts
   1. You're meant to run the example and show the website
   2. Swap to the production stack and run it again
4. 6index_delux_example.ts
   1. Continue running this example ontop of the production stack
5. Run destroy on both stacks to remove what you've created
