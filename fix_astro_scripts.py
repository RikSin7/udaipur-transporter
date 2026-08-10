import os
import re

directory = 'src'
for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.astro'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            # Find document.addEventListener("astro:page-load", functionName);
            # We want to replace it with:
            # functionName();
            # document.addEventListener("astro:page-load", functionName);
            
            # Regex to match: document.addEventListener("astro:page-load", initSomething);
            pattern1 = r'document\.addEventListener\("astro:page-load",\s*([a-zA-Z0-9_]+)\);'
            
            def replacer1(match):
                func_name = match.group(1)
                return f'{func_name}();\n  document.addEventListener("astro:page-load", {func_name});'
                
            new_content = re.sub(pattern1, replacer1, content)
            
            # For EnquiryModal.astro:
            # document.addEventListener("astro:page-load", () => {
            #   initModalLogic();
            # });
            pattern2 = r'document\.addEventListener\("astro:page-load",\s*\(\)\s*=>\s*\{\s*([a-zA-Z0-9_]+)\(\);\s*\}\);'
            
            def replacer2(match):
                func_name = match.group(1)
                return f'{func_name}();\n  document.addEventListener("astro:page-load", () => {{\n    {func_name}();\n  }});'
            
            new_content = re.sub(pattern2, replacer2, new_content)
            
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Fixed {filepath}")

