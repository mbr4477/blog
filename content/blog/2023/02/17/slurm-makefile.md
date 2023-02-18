---
title: Autopicking Available SLURM Queues
date: 2023-02-17
---

I do a lot of my neural network training on a computing cluster at the University of Kentucky with GPUs.
The cluster uses [SLURM](https://en.wikipedia.org/wiki/Slurm_Workload_Manager) to submit jobs that run when enough resources (computer nodes) are available.
This lets me run batches of experiments simultaneously and just watch the results from my desktop computer in the lab.

Since I still write the code on my desktop, I use Makefiles to automatically copy the code to the remote cluster and submit the SLURM job.
An example looks something like this:
```Makefile
default:
  ssh myusername@thecluster.edu mkdir -p /home/myusername/myproject
  rsync -av . myusername@thecluster.edu:/home/myusername/myproject
  echo "#!/bin/bash" > tmp.sh
  echo "#SBATCH --time 04:00:00" >> tmp.sh
  echo "#SBATCH --job-name=myproject-name" >> tmp.sh
  echo "#SBATCH --nodes=1" >> tmp.sh
  echo "#SBATCH --ntasks=2 # cores" >> tmp.sh
  echo -n "#SBATCH --partition=V4V32_SKY32M192_L" >> tmp.sh
  echo "#SBATCH -e slurm-%j.err" >> tmp.sh
  echo "#SBATCH -o slurm-%j.out" >> tmp.sh
  echo "#SBATCH -A my-slurm-project-id-for-billing" >> tmp.sh
  echo "#SBATCH --gres=gpu:1" >> tmp.sh
  echo "python myfile.py ..." >> tmp.sh
  scp tmp.sh myusername@thecluster.edu:/home/myusername/myproject/tmp.sh
  rm tmp.sh
  ssh myusername@thecluster.edu "cd myproject && sbatch tmp.sh"
```
To do this, I need to pick a "queue" or "partition" on the cluster to submit the job to (like `V4V32_SKY32M192_L`).
These queues differ based on the CPU, GPU, or amount of memory.
However, I don't have strict queue requirements.
I just want to use any of the open GPU queues.

To help me out, I can include a little bash script magic in my Makefile that will remotely pull all the SLURM queues and filter them
to find the idle GPU queues. The SLURM `sinfo` command produces output like this:
```bash
SKY32M192_L          up 14-00:00:0      6   drng skylake[026-030,045]
SKY32M192_L          up 14-00:00:0     32  alloc skylake[001-002,005-006,009,014,017-018,021-022,025,031-034,036-040,042-044,046-054]
SKY32M192_D          up    1:00:00      1  alloc skylake056
P4V16_HAS16M128_L    up 3-00:00:00      1   comp gpdnode001
P4V16_HAS16M128_L    up 3-00:00:00      1   idle gpdnode002
P4V12_SKY32M192_L    up 3-00:00:00      1   comp gphnode002
P4V12_SKY32M192_L    up 3-00:00:00      1    mix gphnode008
P4V12_SKY32M192_L    up 3-00:00:00      4  alloc gphnode[001,004-006]
P4V12_SKY32M192_L    up 3-00:00:00      2   idle gphnode[003,009]
P4V12_SKY32M192_D    up    1:00:00      1   idle gphnode010
V4V16_SKY32M192_L    up 3-00:00:00      2  alloc gvnode[001-002]
V4V32_SKY32M192_L    up 3-00:00:00      4    mix gvnode[003-006]
CAL48M192_L          up 14-00:00:0      1    mix cascade004
CAL48M192_L          up 14-00:00:0     49  alloc cascade[002-003,005-043,045-052]
CAL48M192_L          up 14-00:00:0      1   down cascade044
CAL48M192_D          up    1:00:00      1  alloc cascade001
CAC48M192_L          up 14-00:00:0      1  down* cascadeb014
CAC48M192_L          up 14-00:00:0     59  alloc cascadeb[001-013,015-060]
V4V32_CAS40M192_L    up 3-00:00:00     12    mix gvnodeb[001-012]
```

I want to grab the lines that show `idle` and `gvnode` (nodes with V100 GPUs).
Then I just want to extract the first token/word on the line to get the queue ID (like `V4V32_SKY32M192_L`)
I can do this in my Makefile with the following line at the top before the `default` line:
```bash
PARTITION := $(shell ssh myusername@thecluster.edu sinfo | grep idle | grep _L | grep gv*node | sort -r | head -1 | awk '{print $$1}')
```
Now the `PARTITION` variable in the Makefile has the ID of the idle GPU queue! I use the `grep` commands to filter down to the right lines,
then apply `sort -r` to prioritize queues with more RAM. Finally, I use `head -1` to get just the first line and `awk` to grab the first word on the line.

Then, when I create my SLURM job script in my Makefile, I can just do:
```Makefile
echo -n "#SBATCH --partition=$(PARTITION)" >> tmp.sh;
```

Now I can easily ensure I use whatever idle queue is available!
