---
title: Setting Up Single-Node Hadoop on an Ubuntu VM (Windows 10 Host)
description: "You could use the Cloudera Quickstart VM, but then you wouldn't be able to use Kotlin."
date: "2020-02-17T18:28"
tags: ["hadoop", "ubuntu"]
featuredImage: elephant.jpg
---
Photo by AJ Robbie on Unsplash

For my Large-Scale Data Science course this semester, I need to use a single-node Hadoop system. The go-to option is the Cloudera Quickstart VM, but it doesn't support Java 8 and comes with Hadoop 2. Kotlin requires Java 8, so I decided to look for a way to setup a custom Ubuntu VM.

The Hadoop install instructions were adapted from [here](https://dev.to/awwsmm/installing-and-running-hadoop-and-spark-on-ubuntu-18-393h) with VirtualBox drag-and-drop working after I did [this](https://www.how2shout.com/how-to/enable-virtualbox-drag-and-drop-windows-10-ubuntu.html).

Make sure you already have VirtualBox installed.

> **UPDATE 2020-02-22**
> 
> After a few VM boots, my guest additions quit working. After banging my head against the proverbial wall for too long, here's what fixed it for me:
> 1. Upgrade VirtualBox to the latest version
> 2. Remove the distro guest DKMS package: `sudo apt-get remove virtualbox-guest-dkms`
> 3. Insert the Guest Additions CD using the VM menu and run the CD to install
> 4. Reboot the guest VM: `sudo reboot`

# Download Ubuntu 18.04 LTS
Grab the latest desktop ISO image from [here](https://ubuntu.com/download/desktop/thank-you?version=18.04.4&architecture=amd64).

# Setup a new VirtualBox Machine
1. Open VirtualBox and click "New"
2. Configure the properties as a 64-bit Ubuntu (Linux) machine
3. Assign RAM to the virtual machine. I picked 4096 MB (4GB).
4. Create a virtual hard disk. We will likely have fairly large files at some point, so I picked 32 GB. This is dynamically allocated, so it won't take up 32 GB of disk space on your host computer unless you really have 32 GB of files in the virtual machine.
5. On first boot, when prompted for bootable media, select the Ubuntu ISO file you downloaded.
6. Choose to install Ubuntu on the disk, and the follow the prompts to finish the installation. I chose a minimal installation to avoid unnecessary bloat.

# Install the VirtualBox Guest Additions
The guest additions will enable drag and drop as well as dynamic window resizing so the virtual machine screen size can match the VirtualBox window.
1. Install the build tools that the guest additions need. Pop open a terminal window (Ctrl-Alt-T) and run
    ```bash
    sudo apt-get update
    sudo apt-get install build-essential -y
    ```
2. Install the guest additions
   ```bash
    sudo apt-get install virtualbox-guest-dkms 
    sudo apt-get install virtualbox-guest-utils
    sudo apt-get install virtualbox-ext-pack
   ```
3. The additions include some kernel modules, so you'll need to reboot the VM now.
   ```bash
    sudo reboot
   ```
   Make sure you select Devices > Drag and Drop > Host To Guest in the VM window. If for some reason drag and drop still isn't working, try installing via the Guest Additions CD (Devices > Insert Guest Additions CD in the VM window).

# Installing Java 8
The minimal Ubuntu install doesn't include Java, so we'll need to install that. [This tutorial](https://dev.to/awwsmm/installing-and-running-hadoop-and-spark-on-ubuntu-18-393h) recommended using SDKMAN! to help manage Java. You can skim the article to learn more about it. Basically, it helps download and use the right Java version. 
1. Install cURL so we can later access the SDKMAN! install script
    ```bash
    sudo apt-get install curl -y
    ```
2. Now download and run the install script
   ```bash
   curl -s "https://get.sdkman.io" | bash
   ```
3. We need to make sure the initialization script runs everytime we open a terminal window, so add it to the `.profile` file:
   ```bash
   echo "source ~/.sdkman/bin/sdkman-init.sh" >> ~/.profile
   ```
   Close the terminal window and reopen it.
4. If everything worked okay, try running
   ```bash
   sdk list java
   ```
   You should see a bunch of Java versions. We want Java 8. Any of the Java 8 versions listed should theoretically work, but I chose the main OpenJDK distribution. To install it, run
   ```bash
   sdk install java 8.0.242-open
   ```
5. Double check that nothing blew up by running
   ```bash
   java -version
   ```
   The output should be something with OpenJDK and version number 1.8.
6. We need to set an environment variable for Java. We'll put this in the `.profile` file again.
   ```bash
   echo "export JAVA_HOME=\$(readlink -f \$(which java) | sed 's:bin/java::')" >> ~/.profile
   ```
   This makes sure every program that needs Java knows where it is. We find the path by grabbing the folder out of the output of the `which java` command.

# Install Hadoop 3.2.1
1. On your virtual machine, download Hadoop 3.2.1 **binary** from the [releases page](https://hadoop.apache.org/releases.html). The direct link to the mirror page for the 3.2.1 binary is [here](https://www.apache.org/dyn/closer.cgi/hadoop/common/hadoop-3.2.1/hadoop-3.2.1.tar.gz). You can download it through Firefox in the VM.
2. Once you've got the binary, extract it to the right place.
   ```bash
   sudo tar -xvf hadoop-3.2.1.tar.gz -C /opt/
   ```
3. Get rid of the downloaded file and then move into `/opt`
   ```bash
   rm hadoop-3.2.1.tar.gz && cd /opt
   ```
4. Rename to `hadoop` and make sure the permissions are set for your user.
   ```bash
   sudo mv hadoop-3.2.1 hadoop && sudo chown USER:USER -R hadoop
   ```
   Replace `USER` with your username on the VM. Mine was `matthew`.
5. Now we need to tell everyone where Hadoop is, so we'll add another line to the `.profile` file like we did for `JAVA_HOME`. We'll also update the `PATH` variable
   ```bash
   echo "export HADOOP_HOME=/opt/hadoop" >> ~/.profile
   echo "export PATH=\$PATH:\$HADOOP_HOME/bin:\$HADOOP_HOME/sbin" >> ~/.profile
   ```
   Close and reopen your terminal to get everything reset.
6. Run this to check if Hadoop is installed okay:
   ```bash
   hadoop version
   ```
   It should say version 3.2.1.
7. Apparently Hadoop needs extra help finding Java. We need to set `JAVA_HOME` again in one of the hadoop config files. To open this file in an editor, run
   ```bash
   sudo gedit /opt/hadoop/etc/hadoop/hadoop-env.sh
   ```
   Find the line that says `# export JAVA_HOME=` and replace it with
   ```
   export JAVA_HOME=~/.sdkman/candidates/java/current
   ``` 

Eventually I may get around to automating this as a bash script, but for now it is a little lengthy.

# Running the Word Count Demo
I'm a big fan of [Kotlin](https://kotlinlang.org/), which has 100% Java interoperability (meaning it can be directly compiled back and forth to Java and use any Java libraries, like Hadoop). It plays nice with the IntelliJ IDEA editor, so hop over to https://www.jetbrains.com/idea/ to download the Community (free) edition if you haven't already. You can use IntelliJ for regular Java coding as well.

Here's what I did to get the [WordCount](https://docs.cloudera.com/documentation/other/tutorial/CDH5/topics/ht_wordcount1.html) example working with Kotlin. Getting it to run with Java probably would be easier, but I opted for Kotlin since I think it's worth the up front effort.

1. Create a project by opening IntelliJ and opening the new project window. Choose "Gradle" in the left pane. Gradle is pretty much like Maven, but newer, and I'm more familiar with it. Both Gradle and Maven configure your project and dependencies to help the build process go smoothly. Check the "Kotlin/JVM" box to add Kotlin support. Click "Next" and name the project something. Hit "Finish".
2. Wait for the initial project build to finish. In the project source browser (left pane), you should eventually see the tree expand and a `main` folder show up. Expand it, right click the `kotlin` subfolder and choose New > Package. Name your package something like `org.example.wordcount` or similar. I used `dev.mruss.wordcount`. 
3. Let's add the Hadoop library as a dependency before we create the code file. Open the `build.gradle` file and look for the `dependencies` section. Add these lines to it:
   ```gradle
    implementation group: 'org.apache.hadoop', name: 'hadoop-mapreduce-client-core', version: "3.2.1"
    implementation group: 'org.apache.hadoop', name: 'hadoop-common', version: "3.2.1"
   ```
   A popup should ask if you want to enable auto-import when the Gradle file changes. Click to enable it.
4. Right click the package you created in step 2, and select New > Kotlin File/Class Name the file `WordCount.kt`. 
5. Here's the Kotlin code equivalent of the Java example that should go inside `WordCount.kt`. Notice that the class names are the same and the functions/properties of the classes are basically the same as well. Kotlin is basically a more-concise Java with newer language features. I didn't comment the code very well (or at all), but the code is similar enough that the explanation from the WordCount tutorial still applies.

```kotlin
package dev.mruss.wordcount

import org.apache.hadoop.conf.Configured
import org.apache.hadoop.fs.Path
import org.apache.hadoop.io.IntWritable
import org.apache.hadoop.io.LongWritable
import org.apache.hadoop.io.Text
import org.apache.hadoop.mapreduce.Job
import org.apache.hadoop.mapreduce.Mapper
import org.apache.hadoop.mapreduce.Reducer
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat
import org.apache.hadoop.util.Tool
import java.util.regex.Pattern
import org.apache.hadoop.util.ToolRunner
import kotlin.system.exitProcess

fun main(args: Array<String>) {
    val res = ToolRunner.run(WordCount(), args)
    exitProcess(res)
}

class WordCount : Configured(), Tool {
    override fun run(args: Array<out String>): Int {
        val job = Job.getInstance(conf, "wordcount")
        job.setJarByClass(this::class.java)
        FileInputFormat.addInputPath(job, Path(args[0]))
        FileOutputFormat.setOutputPath(job, Path(args[1]))
        job.mapperClass = Map::class.java
        job.reducerClass = Reduce::class.java
        job.outputKeyClass = Text::class.java
        job.outputValueClass = IntWritable::class.java
        return if (job.waitForCompletion(true)) 0 else 1
    }

    class Map : Mapper<LongWritable, Text, Text, IntWritable>() {
        private val wordBoundary = Pattern.compile("\\s*\\b\\s*")
        private val one = IntWritable(1)
        override fun map(key: LongWritable, value: Text?, context: Context) {
            val line = value?.toString()
            for (word in wordBoundary.split(line)) {
                if (word.isNotEmpty()) {
                    context.write(Text(word), one)
                }
            }
        }
    }

    class Reduce : Reducer<Text, IntWritable, Text, IntWritable>() {
        override fun reduce(key: Text, values: MutableIterable<IntWritable>, context: Context) {
            var sum = 0
            for (count in values) {
                sum += count.get()
            }
            context.write(key, IntWritable(sum))
        }
    }
}
```

5. Now let's build everything. We need to add one more thing to the `build.gradle` file. Open it back up and add these lines at the bottom:
    ```gradle
    jar {
        manifest {
            attributes 'Main-Class': 'dev.mruss.wordcount.WordCountKt'
        }
        from {
            configurations.runtimeClasspath.collect { it.isDirectory() ? it : zipTree(it)}
        }
    }
    ```
    This tells gradle to build a fat/uber jar with all the dependencies packaged inside it. Make sure to replace `dev.mruss.wordcount.WordCountKt` with the equivalent package that you chose.
6. Find the Gradle pane on the right edge of the editor. Expand WordCount > Tasks > build and double click "build" inside it. If all goes well, hop back to the Project pane (left side) and look for a new `build` folder. Expand it, and then expand the `libs` subfolder. There's your jar!

## Running on the VM
1. Drag the jar from IntelliJ onto the VM desktop. If this doesn't work, revisit the VirtualBox setup instructions to make sure all the packages got installed and Host To Guest drag and drop is enabled.
2. Open a terminal window **in the VM**. 
3. Create the HDFS folders.
    ```bash
    hadoop fs -mkdir ~/hdfs
    hadoop fs -mkdir ~/hdfs/wordcount
    hadoop fs -mkdir ~/hdfs/wordcount/input
    ```
4. Create the files to work with and put them in the HDFS.
    ```bash
    echo "Hadoop is an elephant" > file0
    echo "Hadoop is as yellow as can be" > file1
    echo "Oh what a yellow fellow is Hadoop" > file2
    hadoop fs -put file* ~/hdfs/wordcount/input 
    ```
5. Run the JAR. You may need to change to the Desktop directory first.
   ```bash
   cd ~/Desktop
   hadoop jar WordCount-all-1.0-SNAPSHOT.jar ~/hdfs/wordcount/input ~/hdfs/wordcount/output
   ```
6. Wait for it to finish. I found that it ran much much faster than the Cloudera VM. Check the results by running
   ```bash
   hadoop fs -cat ~/hdfs/wordcount/output/*
   ```

# Conclusion
If everything went according to plan, you now have a Hadoop system running on an Ubuntu VM in VirtualBox! Note that this is will default to a single node, single process execution, as described [here](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SingleCluster.html#Standalone_Operation). For lots more information about Kotlin, check out [kotlinlang.org](http://kotlinlang.org/).